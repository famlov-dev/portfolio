import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "developers.elementor.com",
      },
    ],
    qualities: [50, 55, 60, 65, 75],
  },
};

const withNextIntl = createNextIntlPlugin();

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: true,
});

export default withBundleAnalyzer(withNextIntl(nextConfig));
