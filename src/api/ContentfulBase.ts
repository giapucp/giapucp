import { ContentfulAsset, ContentfulBannerResponse, ContentfulImage, ProcessedBanner } from "./types/contentful";

const SPACE_ID = process.env.NEXT_PUBLIC_SPACE_ID || "";
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_ACCESS_TOKEN || "";
const CONTENTFUL_CDA_HOST = "https://cdn.contentful.com";
const DEFAULT_ENVIRONMENT = "master";


//https://cdn.contentful.com/spaces/5m3ko30js8yw/environments/master/entries?content_type=miembros&access_token=yX4sGnM2Q3kvmH1371RwyI2pdWrSqzTVWEKQ9PAzYQc

const getBaseURL = (): string => {
  if (!SPACE_ID) {
    throw new Error("Missing NEXT_PUBLIC_CONTENTFUL_SPACE_ID. Check your .env file.");
  }
  if (!ACCESS_TOKEN) {
    throw new Error("Missing NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN. Check your .env file.");
  }
  return `${CONTENTFUL_CDA_HOST}/spaces/${SPACE_ID}/environments/${DEFAULT_ENVIRONMENT}`;
};

export const getContentDeliveryURL = (table: string, additionalParams: string = "", include: number = 0) => {
  const baseURL = `${getBaseURL()}/entries?content_type=${table}&access_token=${ACCESS_TOKEN}`;
  let URL = baseURL;
  
  if (additionalParams) {
    URL += `&${additionalParams}`;
  }
  
  // IMPORTANTE: Solo agregar include si es > 0 y no está ya incluido en additionalParams
  if (include > 0 && !additionalParams.includes('include=')) {
    URL += `&include=${include}`;
  }
  
  console.log("Contentful URL:", URL);
  return URL;
};

export function getImageUrl(
  imageField: ContentfulImage | ContentfulAsset | undefined | null,
  placeholder: string = "/placeholder.jpg"
): string {
  if (!imageField || !('fields' in imageField) || !imageField.fields?.file?.url) {
    return placeholder;
  }

  const imageUrl = imageField.fields.file.url;
  return imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl;
}

export const getBannerByNombre = async (nombre: string): Promise<ProcessedBanner | null> => {
  try {
    const url = getContentDeliveryURL(
      'banner', 
      `fields.nombre=${encodeURIComponent(nombre)}`, 
      1
    );
    
    const response = await fetch(url, {
      next: { revalidate: 60 }
    });
    
    if (!response.ok) {
      throw new Error(`Error fetching banner: ${response.statusText}`);
    }
    
    const data: ContentfulBannerResponse = await response.json();
    
    if (data.items && data.items.length > 0) {
      const bannerFields = data.items[0].fields;
      
      // Procesar el banner para incluir el asset completo
      const processedBanner: ProcessedBanner = {
        nombre: bannerFields.nombre,
      };
      
      // Buscar el asset en includes si existe
      if (bannerFields.media && data.includes?.Asset) {
        const assetId = bannerFields.media.sys.id;
        const asset = data.includes.Asset.find(a => a.sys.id === assetId);
        if (asset) {
          processedBanner.media = asset;
        }
      }
      
      return processedBanner;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching banner:', error);
    return null;
  }
};