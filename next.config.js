/** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.WP_IMAGES_URL,
        port: '',
      },
    ],
  },
};
