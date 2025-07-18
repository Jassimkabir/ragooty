import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co', // allows any Supabase project
        pathname: '/storage/v1/object/public/images/**',
      },
    ],
  },
};

export default nextConfig;
