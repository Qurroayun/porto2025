import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gcmojogzfjeenmyqyvrl.supabase.co', // domain bucket Supabase
        port: '',
        pathname: '/storage/v1/object/public/**', // path dari bucket
      },
    ],
  },
};

export default nextConfig;
