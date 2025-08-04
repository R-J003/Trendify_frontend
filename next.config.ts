// frontend/next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  // --- ADD THIS ENTIRE 'images' BLOCK ---
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // ------------------------------------
};

export default nextConfig;