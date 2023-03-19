/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
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
    ],
  },
};

module.exports = nextConfig;
