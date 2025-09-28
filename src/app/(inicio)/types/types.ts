export type CategoriaResponse = {
  id: number | string;
  tipo?: string;
  attributes?: {
    tipo?: string;
  };
};
export type NoticiaResponse = {
  id: number | string;
  titulo?: string;
  contenido?: string;
  textoFinal?: string;
  fechaPublicacion?: string;
  portada?: Portada;
  categoria?: CategoriaResponse[];
  attributes?: {
    titulo?: string;
    contenido?: string;
    textoFinal?: string;
    fechaPublicacion?: string;
    portada?: Portada;
    categoria?: CategoriaResponse[];
  };
};

export type Categoria = { id: number | string; nombre: string };

export type Noticia = {
  id: number | string;
  titulo: string;
  contenido: string;
  textoFinal: string;
  fechaPublicacion: string;
  portada: string;
  categorias: Categoria[];
};

// Portada puede venir en varios formatos desde Strapi
export type Portada =
  | { data: { attributes: { url: string } } }
  | { attributes: { url: string } }
  | { url: string }
  | null
  | undefined;
