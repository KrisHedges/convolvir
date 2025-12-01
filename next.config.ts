import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  cacheComponents: true,
  turbopack: {
    root: '.',
  },
};

export default nextConfig;
