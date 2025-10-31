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

// En ContentfulBase.ts
export const getContentDeliveryURL = (table: string, additionalParams: string = "", include: number = 0) => {
  const baseURL = `${getBaseURL()}/entries?content_type=${table}&access_token=${ACCESS_TOKEN}`;
  let URL = baseURL;
  
  if (additionalParams) {
    URL += `&${additionalParams}`;
  }
  
  if (include > 0) {
    URL += `&include=${include}`;
  }
  
  console.log("Contentful URL:", URL);
  return URL;
};

//Hasta aquí está bien
export interface ContentfulImage {
  fields?: {
    file?: {
      url?: string;
      details?: {
        image?: {
          width: number;
          height: number;
        };
      };
      fileName?: string;
      contentType?: string;
    };
  };
  sys?: {
    id: string;
    type: string;
  };
}

export interface ContentfulAsset {
  fields: {
    title: string;
    description: string;
    file: {
      url: string;
      details: {
        size: number;
        image: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    };
  };
}

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