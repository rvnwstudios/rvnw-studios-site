import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Case study imagery is served from Sanity's asset CDN. Without this,
    // next/image rejects the host outright at render time.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
