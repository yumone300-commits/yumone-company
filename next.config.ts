import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Support reads approved CMS content per request and protects draft/download routes.
  // Existing non-support routes keep their static rendering where possible.
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
