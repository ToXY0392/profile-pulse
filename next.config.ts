import type { NextConfig } from "next";

const FRAME_ANCESTORS = [
  "'self'",
  "https://*.gnosis.io",
  "https://*.vercel.app",
].join(" ");

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  turbopack: {
    root: __dirname,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `frame-ancestors ${FRAME_ANCESTORS};`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
