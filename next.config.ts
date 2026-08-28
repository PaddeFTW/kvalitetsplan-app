import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The preview is served through a hostname that changes whenever the
  // environment is recreated. Next.js gates dev assets/HMR by origin, so
  // allow the preview origin derived from the public host suffix.
  allowedDevOrigins: process.env.BASE44_PUBLIC_HOST_SUFFIX
    ? [`3000-${process.env.BASE44_PUBLIC_HOST_SUFFIX}`]
    : [],
};

export default nextConfig;
