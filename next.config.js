/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "images.fotmob.com", protocol: "https" }],
  },
};

module.exports = nextConfig;
