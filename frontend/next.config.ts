import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.nhathuoclongchau.com.vn",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
