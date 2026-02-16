// components/BannerClient.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getBannerByNombre } from '@/api/ContentfulBase';
import { getImageUrl } from '@/api/ContentfulBase';
import { ProcessedBanner } from '@/api/types/contentful.d'; // Importa ProcessedBanner, no ContentfulBannerFields

interface BannerProps {
  nombre: string;
  titulo?: string;
  className?: string;
  altura?: 'sm' | 'md' | 'lg' | 'xl';
}

const alturaMap = {
  sm: 'h-[200px] md:h-[250px]',
  md: 'h-[250px] md:h-[300px]',
  lg: 'h-[300px] md:h-[400px]',
  xl: 'h-[350px] md:h-[500px]',
};

export default function Banner({ 
  nombre, 
  titulo, 
  className = '', 
  altura = 'md' 
}: BannerProps) {
  // Usa ProcessedBanner en lugar de ContentfulBannerFields
  const [bannerData, setBannerData] = useState<ProcessedBanner | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        setLoading(true);
        const data = await getBannerByNombre(nombre);
        setBannerData(data);
      } catch (error) {
        console.error('Error fetching banner:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, [nombre]);

  if (loading) {
    return (
      <div className={`relative w-full ${alturaMap[altura]} ${className} bg-gray-200 animate-pulse`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!bannerData || !bannerData.media) {
    return (
      <div className={`relative w-full ${alturaMap[altura]} ${className} bg-gradient-to-r from-gray-900 to-gray-700`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl font-bold px-4 text-center">
            {titulo || nombre}
          </h1>
        </div>
      </div>
    );
  }

  // Ahora bannerData.media es ContentfulAsset, que tiene fields
  const imageUrl = getImageUrl(bannerData.media);

  return (
    <div className={`relative w-full ${alturaMap[altura]} ${className} overflow-hidden`}>
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={imageUrl}
          // Ahora TypeScript sabe que media.fields existe
          alt={bannerData.media?.fields?.title || titulo || bannerData.nombre}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Degradado responsive */}
      <div className="absolute inset-0 bg-black/30 md:bg-gradient-to-r md:from-black md:via-black/50 md:to-transparent" />
      <div className="absolute inset-0 bg-black/20 md:hidden" />

      <div className="relative h-full flex items-center justify-center md:justify-start">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold 
                         max-w-full md:max-w-[50%] text-center md:text-left
                         drop-shadow-lg">
            {titulo || bannerData.nombre}
          </h1>
        </div>
      </div>
    </div>
  );
}