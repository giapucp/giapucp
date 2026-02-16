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
    sys: {
    id: string;
    type: string;
  };
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
// Este es el tipo que viene de Contentful (con el link)
export interface ContentfulBannerFields {
  nombre: string;
  media: {
    sys: {
      type: string;
      linkType: string;
      id: string;
    };
  };
}

// Este es el tipo procesado (con el asset completo)
export interface ProcessedBanner {
  nombre: string;
  media?: ContentfulAsset; // Asset completo, no solo el link
}

// Tipo para la respuesta completa de Contentful
export interface ContentfulBannerResponse {
  items: Array<{
    fields: ContentfulBannerFields;
    sys: {
      id: string;
    };
  }>;
  includes?: {
    Asset?: ContentfulAsset[];
  };
}