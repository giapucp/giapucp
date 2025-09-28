import {
  Categoria,
  CategoriaResponse,
  Noticia,
  NoticiaResponse,
} from "../types/types";


import { API_URL, getImageUrl } from "../../api/strapiBase";

function mapCategorias(
  categoriasRaw: CategoriaResponse[] | undefined,
): Categoria[] {
  if (!Array.isArray(categoriasRaw)) return [];
  return categoriasRaw.map((cat) => ({
    id: cat.id,
    nombre: cat.tipo || cat.attributes?.tipo || "Sin categoría",
  }));
}

export async function fetchNoticiasRecientes(limit = 4): Promise<Noticia[]> {
  try {
    console.log("API_URL", API_URL);
    const res = await fetch(
      `${API_URL}/noticias?populate=*&sort=fechaPublicacion:desc&pagination[limit]=${limit}`,
    );
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const { data } = await res.json();

    return data.map((noticia: NoticiaResponse) => {
      const { attributes = {} } = noticia;
      const titulo = noticia.titulo || attributes.titulo || "Sin título";
      const contenido = noticia.contenido ?? attributes.contenido ?? "";
      const textoFinal = noticia.textoFinal ?? attributes.textoFinal ?? "";
      const fechaPublicacion =
        noticia.fechaPublicacion ??
        attributes.fechaPublicacion ??
        new Date().toISOString();

      const portadaUrl = getImageUrl(noticia.portada);

      const categoriasRaw = noticia.categoria || attributes.categoria;
      const categorias = mapCategorias(categoriasRaw);

      return {
        id: noticia.id,
        titulo,
        contenido,
        textoFinal,
        fechaPublicacion,
        portada: portadaUrl,
        categorias,
      };
    });
  } catch (err) {
    console.error("Error fetching noticias recientes:", err);
    throw err;
  }
}
