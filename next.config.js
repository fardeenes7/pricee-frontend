/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.techlandbd.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.startech.com.bd",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.cloud.ryanscomputers.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
