"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

const CAL_NAMESPACE = "intro-meeting-call";
const CAL_LINK = "rvnwstudios/intro-meeting-call";

// Literal, not var(--color-hero): the embed renders inside Cal.com's own
// iframe, which can't see this page's CSS custom properties — cssVarsPerTheme
// wants an actual hex string. Keep in sync with --color-hero in globals.css.
const BRAND_COLOR = "#FF5A1F";

export function BookCallPanel() {
  useEffect(() => {
    (async function run() {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal("ui", {
        theme: "dark",
        cssVarsPerTheme: {
          light: { "cal-brand": BRAND_COLOR },
          dark: { "cal-brand": BRAND_COLOR },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <div className="flex flex-col border border-[#2A2A28] bg-[#111110] p-8 sm:p-10">
      <span className="mb-4 block font-mono text-xs tracking-[0.15em] text-grid uppercase">
        Path 02
      </span>
      <h3 className="mb-3 font-display text-2xl font-semibold text-paper sm:text-[28px]">
        Book a Call
      </h3>
      <p className="mb-6 max-w-[560px] font-body text-base leading-relaxed text-grid">
        Prefer to talk it through first? Grab 30 minutes and we&apos;ll walk through the project live —
        no form required.
      </p>

      <Cal
        namespace={CAL_NAMESPACE}
        calLink={CAL_LINK}
        style={{ width: "100%", height: "650px", overflow: "scroll" }}
        config={{
          layout: "month_view",
          useSlotsViewOnSmallScreen: "true",
          theme: "dark",
        }}
      />
    </div>
  );
}
