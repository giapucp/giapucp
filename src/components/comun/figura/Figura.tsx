
import Image from 'next/image';
import { getFiguraByNombre, getImageUrl } from '@/api/ContentfulBase';

interface FiguraProps {
  nombre: string;
  alt?: string;
  caption?: string;
  className?: string;
  maxAncho?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  rounded?: boolean;
}

const maxAnchoMap = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-full',
};

export default async function Figura({
  nombre,
  alt,
  caption,
  className = '',
  maxAncho = 'lg',
  rounded = true,
}: FiguraProps) {
  const figuraData = await getFiguraByNombre(nombre);

  if (!figuraData?.media) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 text-gray-400 rounded-lg p-8 ${className}`}>
        <p className="text-sm">Imagen no disponible</p>
      </div>
    );
  }

  const imageUrl = getImageUrl(figuraData.media);
  const imageDetails = figuraData.media.fields?.file?.details?.image;
  const width = imageDetails?.width || 800;
  const height = imageDetails?.height || 600;
  const title = figuraData.media.fields?.title;

  return (
    <figure className={`w-full ${maxAnchoMap[maxAncho]} mx-auto ${className}`}>
      <Image
        src={imageUrl}
        alt={alt || title || figuraData.nombre}
        width={width}
        height={height}
        className={`w-full h-auto ${rounded ? 'rounded-lg' : ''}`}
        sizes={`(max-width: 640px) 100vw, (max-width: 1024px) 75vw, ${maxAncho === 'full' ? '100vw' : '50vw'}`}
      />
      {caption && (
        <figcaption className="text-center text-sm text-gray-500 mt-2 italic font-primary">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
