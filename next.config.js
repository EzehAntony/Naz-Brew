/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: { domains: ["www.pexels.com", "images.pexels.com"] },
  experimental: {
    viewport: {
      themeColor: "#ffffff", // Example, not necessarily the right place
    },
  },
};

module.exports = nextConfig;
