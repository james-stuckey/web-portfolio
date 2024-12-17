import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    // https://i.scdn.co/image/ab67616d0000b273aa50644f05f26e73ba950b8c
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'i.scdn.co',
            port: '',
            pathname: '/image/**',
            search: '',
          },
        ],
      },
};

export default nextConfig;
