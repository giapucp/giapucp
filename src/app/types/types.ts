// types/types.ts
export interface ContentfulImage {
  fields: {
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
    title: string;
    description: string;
  };
}

export interface NoticiaFields {
  titulo: string;
  subtitulo: string;
  banner?: string;
  portada: ContentfulImage;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contenido: any; // RichText de Contentful
  fechaPublicacion: string;
}

export interface Noticia {
  id: string;
  titulo: string;
  subtitulo: string;
  banner?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contenido: any;
  fechaPublicacion: string;
  portada: string;
}

export type YearWithRows = {
  year: string;
  rows: Noticia[][];
};

export interface ContentfulNoticiaResponse {
  items: Array<{
    sys: {
      id: string;
    };
    fields: NoticiaFields;
  }>;
}

export interface AreaFields {
  nombre: string;
}

export interface CargoFields {
  nombre: string;
}

export interface MiembroFields {
  nombres: string;
  apellidopaterno: string;
  foto?: ContentfulImage;
  area: {
    sys: {
      id: string;
      linkType: string;
      type: string;
    };
  };
  cargo: {
    sys: {
      id: string;
      linkType: string;
      type: string;
    };
  };
}

export interface Miembro {
  id: string;
  nombres: string;
  apellidopaterno: string;
  foto: string;
  area: {
    nombre: string;
  };
  cargo: {
    nombre: string;
  };
}

export interface ContentfulMiembroResponse {
  items: Array<{
    sys: {
      id: string;
    };
    fields: MiembroFields;
  }>;
  includes?: {
    Entry?: Array<{
      sys: {
        id: string;
        type: string;
        contentType?: {
          sys: {
            id: string;
          };
        };
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fields: any;
    }>;
    Asset?: Array<{
      sys: {
        id: string;
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fields: any;
    }>;
  };
}
