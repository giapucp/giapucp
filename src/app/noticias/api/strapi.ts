import type { Noticia, Categoria } from "../types/types";


import { API_URL, getImageUrl } from "../../api/strapiBase";

// Raw Strapi structure for a category when populated
interface StrapiPopulatedCategoryData {
  id: number;
  attributes: {
    tipo: string;
  };
}

// Raw Strapi structure for an image/media when populated
interface StrapiPopulatedImageData {
  data: {
    id: number;
    attributes: {
      url: string;
    };
  };
}

// Raw Strapi structure for a news item with populated fields
interface StrapiNoticiaDataAttributes {
  titulo: string;
  contenido: string;
  textoFinal: string;
  fechaPublicacion: string;
  portada?: StrapiPopulatedImageData;
  categoria?: { data: StrapiPopulatedCategoryData[] };
}

interface StrapiNoticiaItem {
  id: number;
  attributes: StrapiNoticiaDataAttributes;
}

// For getCategories
interface RawCategoryItem {
  id: number;
  attributes?: { tipo: string };
  tipo?: string;
}

// For fetchNoticiasRecientes
interface StrapiFlattenedNoticiaItem {
  id: number;
  titulo: string;
  contenido: string;
  textoFinal: string;
  fechaPublicacion: string;
  portada?: { url: string };
  categoria?: Array<{ id: number; tipo: string }>;
}

const cache = new Map<string | number, Noticia>();

export async function fetchNoticias(): Promise<Noticia[]> {
  try {
    console.log("API_URL", API_URL);
    const response = await fetch(`${API_URL}/noticias?populate=*`);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const { data } = await response.json();
    return data.map((item: StrapiNoticiaItem) => {
      const attributes = item.attributes || item;
      return {
        id: item.id,
        titulo: attributes.titulo || "Sin título",
        contenido: attributes.contenido || "",
        textoFinal: attributes.textoFinal || "",
        fechaPublicacion:
          attributes.fechaPublicacion || new Date().toISOString(),
        portada: getImageUrl(attributes.portada),
        categorias: getCategories(attributes.categoria),
      };
    });
  } catch (error) {
    console.error("Error fetching noticias:", error);
    return [];
  }
}


function getCategories(categoria: { data: RawCategoryItem[] } | RawCategoryItem[] | undefined): Categoria[] {
  if (categoria === undefined) {
    return [];
  }
  const categoriasData = Array.isArray(categoria) ? categoria : categoria.data;
  return categoriasData.map((cat: RawCategoryItem) => ({
    id: cat.id,
    nombre: cat.attributes?.tipo || cat.tipo || "Sin categoría",
  }));
}

export async function fetchNoticiaById(id: string | number): Promise<Noticia | null> {
  if (cache.has(id)) {
    const noticia = cache.get(id);
    return noticia ?? null;
  }
  try {
    const response = await fetch(
      `${API_URL}/noticias/${id}?populate[portada]=*&populate[categoria]=*`
    );
    const { data } = await response.json();
    const noticia: Noticia = {
      id: data.id,
      ...data.attributes,
      portada: getImageUrl(data.attributes.portada?.data?.attributes),
      categorias: getCategories(data.attributes.categoria?.data),
    };
    cache.set(id, noticia);
    return noticia;
  } catch (error) {
    console.error(`Error fetching noticia ${id}:`, error);
    return null;
  }
}

export async function fetchNoticiasRecientes(limit = 4): Promise<Noticia[]> {
  try {
    const response = await fetch(
      `${API_URL}/noticias?populate=*&sort=fechaPublicacion:desc&pagination[limit]=${limit}`
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const { data } = await response.json();
    return data.map((noticia: StrapiFlattenedNoticiaItem) => ({
      id: noticia.id,
      titulo: noticia.titulo || "Sin título",
      contenido: noticia.contenido || "",
      textoFinal: noticia.textoFinal || "",
      fechaPublicacion: noticia.fechaPublicacion || new Date().toISOString(),
      portada: noticia.portada?.url
        ? noticia.portada.url
        : "/placeholder-noticia.jpg",
      categorias:
        noticia.categoria?.map((cat: { id: number; tipo: string }) => ({
          id: cat.id,
          nombre: cat.tipo || "Sin categoría",
        })) || [],
    }));
  } catch (error) {
    console.error("Error fetching noticias recientes:", error);
    return [];
  }
}

export async function getNoticiasRecientes(limit = 4): Promise<Noticia[]> {
  try {
    const allNoticias = await fetchNoticias();
    return allNoticias
      .sort(
        (a, b) => new Date(b.fechaPublicacion).getTime() - new Date(a.fechaPublicacion).getTime()
      )
      .slice(0, limit);
  } catch (error) {
    console.error("Error al obtener noticias recientes:", error);
    return [];
  }
}
