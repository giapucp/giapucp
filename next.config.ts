import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'images.ctfassets.net',
      'localhost', // para desarrollo local
      // añade otros dominios si los necesitas
    ],
    formats: ['image/webp', 'image/avif'], // formatos optimizados
  },
};

export default nextConfig;
