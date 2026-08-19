"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export interface HeroNetworkBackgroundProps {
  /** Node count at desktop viewport widths. Scaled down automatically on mobile. */
  nodeCount?: number;
  /** Max distance (world units) between two nodes for a connecting line to draw. */
  maxConnectionDistance?: number;
  /** Drift velocity magnitude. Keep this small — the point is near-imperceptible motion. */
  driftSpeed?: number;
  accentColor?: string;
  baseColor?: string;
  backgroundColor?: string;
  className?: string;
}

const DEFAULTS = {
  nodeCount: 140,
  maxConnectionDistance: 2.6,
  driftSpeed: 0.035,
  accentColor: "#FF5A1F",
  baseColor: "#E8E8E4",
  backgroundColor: "#0A0A0A",
} as const;

// Applied on narrow viewports so the sim stays light on mid-tier mobile —
// fewer nodes AND a shorter connection reach (fewer, cheaper line checks).
const MOBILE_BREAKPOINT = "(max-width: 768px)";
const MOBILE_NODE_SCALE = 0.45;
const MOBILE_DISTANCE_SCALE = 0.75;
const MIN_NODE_COUNT = 12;

// Resting brightness range for nodes/lines — deliberately low so the field
// reads as structure in the dark, not a bright pattern competing with copy.
const NODE_MIN_INTENSITY = 0.15;
const NODE_MAX_INTENSITY = 0.3;
const LINE_OPACITY_CAP = 0.28;

// Sin raised to a high power spends most of its time near zero and briefly
// spikes near 1 — an occasional pulse per node, not a synchronized loop.
const PULSE_SHARPNESS = 10;

interface NetworkFieldProps {
  nodeCount: number;
  maxConnectionDistance: number;
  driftSpeed: number;
  accentColor: string;
  baseColor: string;
  animate: boolean;
}

function NetworkField({
  nodeCount,
  maxConnectionDistance,
  driftSpeed,
  accentColor,
  baseColor,
  animate,
}: NetworkFieldProps) {
  const { viewport } = useThree();

  const baseColorObj = useMemo(() => new THREE.Color(baseColor), [baseColor]);
  const accentColorObj = useMemo(() => new THREE.Color(accentColor), [accentColor]);

  // Half-extents of the drift volume in world units at z = 0. Z stays
  // shallow — this is a background, not a scene with real depth to explore.
  const bounds = useMemo(
    () => ({
      x: Math.max(viewport.width, 8) / 2 + 1,
      y: Math.max(viewport.height, 8) / 2 + 1,
      z: 4,
    }),
    [viewport.width, viewport.height],
  );

  // Generous fixed upper bound on simultaneous line segments so the buffer
  // never needs to be reallocated at runtime; excess pairs beyond this in a
  // single frame are simply skipped (degrades gracefully under a dense
  // cluster rather than growing the buffer).
  const maxSegments = nodeCount * 8;

  const pointsGeometryRef = useRef<THREE.BufferGeometry>(null);
  const lineGeometryRef = useRef<THREE.BufferGeometry>(null);
  const elapsed = useRef(0);

  // All mutable simulation state lives behind a plain ref, not React state or
  // useMemo — useFrame mutates these typed arrays directly every tick and the
  // drift loop never re-renders or reallocates. Refs are only ever read or
  // written inside effects/useFrame below, never during render — nothing in
  // the JSX depends on this data, geometry attributes are wired imperatively.
  const simRef = useRef<{
    positions: Float32Array;
    velocities: Float32Array;
    pulsePhase: Float32Array;
    pulseSpeed: Float32Array;
    restIntensity: Float32Array;
    nodeColors: Float32Array;
    linePositions: Float32Array;
    lineColors: Float32Array;
  } | null>(null);

  // (Re)seed whenever node count or bounds change meaningfully — e.g. a real
  // viewport resize, not a scroll jitter — and wire the resulting typed
  // arrays onto the geometries as real BufferAttributes.
  useLayoutEffect(() => {
    const positions = new Float32Array(nodeCount * 3);
    const velocities = new Float32Array(nodeCount * 3);
    const pulsePhase = new Float32Array(nodeCount);
    const pulseSpeed = new Float32Array(nodeCount);
    const restIntensity = new Float32Array(nodeCount);
    const nodeColors = new Float32Array(nodeCount * 3);
    const linePositions = new Float32Array(maxSegments * 2 * 3);
    const lineColors = new Float32Array(maxSegments * 2 * 3);

    for (let i = 0; i < nodeCount; i++) {
      positions[i * 3] = (Math.random() * 2 - 1) * bounds.x;
      positions[i * 3 + 1] = (Math.random() * 2 - 1) * bounds.y;
      positions[i * 3 + 2] = (Math.random() * 2 - 1) * bounds.z;

      velocities[i * 3] = (Math.random() * 2 - 1) * driftSpeed;
      velocities[i * 3 + 1] = (Math.random() * 2 - 1) * driftSpeed;
      velocities[i * 3 + 2] = (Math.random() * 2 - 1) * driftSpeed * 0.5;

      // Periods roughly 10-30s and a random phase offset so pulses across
      // the field never line up.
      pulsePhase[i] = Math.random() * Math.PI * 2;
      pulseSpeed[i] = 0.2 + Math.random() * 0.35;
      restIntensity[i] = NODE_MIN_INTENSITY + Math.random() * (NODE_MAX_INTENSITY - NODE_MIN_INTENSITY);

      const ri = restIntensity[i];
      nodeColors[i * 3] = baseColorObj.r * ri;
      nodeColors[i * 3 + 1] = baseColorObj.g * ri;
      nodeColors[i * 3 + 2] = baseColorObj.b * ri;
    }

    simRef.current = {
      positions,
      velocities,
      pulsePhase,
      pulseSpeed,
      restIntensity,
      nodeColors,
      linePositions,
      lineColors,
    };

    const pointsGeometry = pointsGeometryRef.current;
    pointsGeometry?.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pointsGeometry?.setAttribute("color", new THREE.BufferAttribute(nodeColors, 3));

    const lineGeometry = lineGeometryRef.current;
    lineGeometry?.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry?.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
    lineGeometry?.setDrawRange(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeCount, bounds.x, bounds.y, bounds.z, maxSegments, driftSpeed]);

  useFrame((_, delta) => {
    const sim = simRef.current;
    if (!animate || !sim) return;
    elapsed.current += delta;

    const { positions, velocities, pulsePhase, pulseSpeed, restIntensity, nodeColors, linePositions, lineColors } =
      sim;

    for (let i = 0; i < nodeCount; i++) {
      const ix = i * 3;

      positions[ix] += velocities[ix] * delta;
      positions[ix + 1] += velocities[ix + 1] * delta;
      positions[ix + 2] += velocities[ix + 2] * delta;

      // Wrap at the bounds instead of bouncing, so density stays even and
      // there's never a visible "collision" moment.
      if (positions[ix] > bounds.x) positions[ix] = -bounds.x;
      else if (positions[ix] < -bounds.x) positions[ix] = bounds.x;
      if (positions[ix + 1] > bounds.y) positions[ix + 1] = -bounds.y;
      else if (positions[ix + 1] < -bounds.y) positions[ix + 1] = bounds.y;
      if (positions[ix + 2] > bounds.z) positions[ix + 2] = -bounds.z;
      else if (positions[ix + 2] < -bounds.z) positions[ix + 2] = bounds.z;

      const raw = Math.sin(elapsed.current * pulseSpeed[i] + pulsePhase[i]);
      const pulse = Math.pow(Math.max(raw, 0), PULSE_SHARPNESS);
      const ri = restIntensity[i];

      nodeColors[ix] = baseColorObj.r * ri + (accentColorObj.r - baseColorObj.r * ri) * pulse;
      nodeColors[ix + 1] = baseColorObj.g * ri + (accentColorObj.g - baseColorObj.g * ri) * pulse;
      nodeColors[ix + 2] = baseColorObj.b * ri + (accentColorObj.b - baseColorObj.b * ri) * pulse;
    }

    if (pointsGeometryRef.current) {
      (pointsGeometryRef.current.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
      (pointsGeometryRef.current.getAttribute("color") as THREE.BufferAttribute).needsUpdate = true;
    }

    // Rebuild connections for the current frame. O(n^2) distance checks, but
    // n stays in the tens-to-low-hundreds, well inside a 60fps budget.
    let segmentCount = 0;
    const maxDistSq = maxConnectionDistance * maxConnectionDistance;
    for (let i = 0; i < nodeCount && segmentCount < maxSegments; i++) {
      const ix = i * 3;
      for (let j = i + 1; j < nodeCount && segmentCount < maxSegments; j++) {
        const jx = j * 3;
        const dx = positions[ix] - positions[jx];
        const dy = positions[ix + 1] - positions[jx + 1];
        const dz = positions[ix + 2] - positions[jx + 2];
        const distSq = dx * dx + dy * dy + dz * dz;
        if (distSq > maxDistSq) continue;

        const dist = Math.sqrt(distSq);
        // Closer = more opaque, capped low — this should read as structure,
        // not a spiderweb.
        const t = 1 - dist / maxConnectionDistance;
        const intensity = t * t * LINE_OPACITY_CAP;

        const segStart = segmentCount * 6;
        linePositions[segStart] = positions[ix];
        linePositions[segStart + 1] = positions[ix + 1];
        linePositions[segStart + 2] = positions[ix + 2];
        linePositions[segStart + 3] = positions[jx];
        linePositions[segStart + 4] = positions[jx + 1];
        linePositions[segStart + 5] = positions[jx + 2];

        lineColors[segStart] = baseColorObj.r * intensity;
        lineColors[segStart + 1] = baseColorObj.g * intensity;
        lineColors[segStart + 2] = baseColorObj.b * intensity;
        lineColors[segStart + 3] = baseColorObj.r * intensity;
        lineColors[segStart + 4] = baseColorObj.g * intensity;
        lineColors[segStart + 5] = baseColorObj.b * intensity;

        segmentCount++;
      }
    }

    if (lineGeometryRef.current) {
      (lineGeometryRef.current.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
      (lineGeometryRef.current.getAttribute("color") as THREE.BufferAttribute).needsUpdate = true;
      lineGeometryRef.current.setDrawRange(0, segmentCount * 2);
    }
  });

  return (
    <group>
      <points>
        <bufferGeometry ref={pointsGeometryRef} />
        <pointsMaterial
          size={0.055}
          vertexColors
          transparent
          sizeAttenuation
          depthWrite={false}
          toneMapped={false}
        />
      </points>
      <lineSegments>
        <bufferGeometry ref={lineGeometryRef} />
        <lineBasicMaterial vertexColors transparent depthWrite={false} toneMapped={false} />
      </lineSegments>
    </group>
  );
}

/**
 * Ambient WebGL constellation background for hero sections. Nodes drift at
 * near-imperceptible speed and connect with faint lines when close; a random
 * node very occasionally pulses the accent color. Absolutely positioned,
 * `pointer-events: none`, and z-indexed behind its container's content by
 * default — wrap it in a `position: relative` section and give your content
 * a higher z-index.
 */
export function HeroNetworkBackground({
  nodeCount = DEFAULTS.nodeCount,
  maxConnectionDistance = DEFAULTS.maxConnectionDistance,
  driftSpeed = DEFAULTS.driftSpeed,
  accentColor = DEFAULTS.accentColor,
  baseColor = DEFAULTS.baseColor,
  backgroundColor = DEFAULTS.backgroundColor,
  className,
}: HeroNetworkBackgroundProps) {
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT);

  const effectiveNodeCount = Math.max(
    MIN_NODE_COUNT,
    Math.round(nodeCount * (isMobile ? MOBILE_NODE_SCALE : 1)),
  );
  const effectiveMaxDistance = maxConnectionDistance * (isMobile ? MOBILE_DISTANCE_SCALE : 1);

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: false, powerPreference: "low-power" }}
        camera={{ position: [0, 0, 30], fov: 45, near: 1, far: 100 }}
        // "demand" renders exactly one frame and then stops — the reduced-
        // motion fallback is a static frame, not a paused animation loop.
        frameloop={reducedMotion ? "demand" : "always"}
        onCreated={({ gl }) => {
          // The default Canvas enables ACES filmic tone mapping, which would
          // remap the exact brand hex values passed in via props. Disable it
          // so colors render as specified, not approximated.
          gl.toneMapping = THREE.NoToneMapping;
        }}
      >
        <color attach="background" args={[backgroundColor]} />
        <NetworkField
          nodeCount={effectiveNodeCount}
          maxConnectionDistance={effectiveMaxDistance}
          driftSpeed={driftSpeed}
          accentColor={accentColor}
          baseColor={baseColor}
          animate={!reducedMotion}
        />
      </Canvas>
    </div>
  );
}
