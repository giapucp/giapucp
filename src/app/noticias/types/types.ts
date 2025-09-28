export type Categoria = {
  id: string | number;
  nombre: string;
};

export type Noticia = {
  id: number | string;
  titulo: string;
  contenido: string;
  textoFinal: string;
  fechaPublicacion: string;
  portada: string;
  categorias: Categoria[];
};

export type YearWithRows = {
  year: string;
  rows: Noticia[][];
};
