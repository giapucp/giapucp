// api/ContentfulNoticias.ts
/* eslint-disable */
import { getContentDeliveryURL } from "../../api/ContentfulBase";
import { Noticia} from "../../types/types";

const cache = new Map<string, Noticia>();

// Función helper para obtener URLs de assets referenciados
function getReferencedAssetUrl(assetsMap: Map<string, any>, reference: any): string {
  if (!reference?.sys?.id) return "/placeholder-noticia.jpg";
  
  const asset = assetsMap.get(reference.sys.id);
  if (asset?.fields?.file?.url) {
    return `https:${asset.fields.file.url}`;
  }
  
  return "/placeholder-noticia.jpg";
}

export async function fetchNoticias(): Promise<Noticia[]> {
  try {
    console.log("Fetching noticias from Contentful...");
    const response = await fetch(getContentDeliveryURL("pageBlogPost", "", 2)); // Incluir referencias
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    
    console.log("Contentful noticias response:", data);
    
    // Crear mapa de assets incluidos
    const assetsMap = new Map();
    if (data.includes?.Asset) {
      data.includes.Asset.forEach((asset: any) => {
        assetsMap.set(asset.sys.id, asset);
      });
    }
    
    return data.items.map((item: any) => {
      // Obtener URL de la portada desde los assets incluidos
      const portadaUrl = getReferencedAssetUrl(assetsMap, item.fields.portada);
      
      const noticia: Noticia = {
        id: item.sys.id,
        titulo: item.fields.titulo || "Sin título",
        subtitulo: item.fields.subtitulo || "",
        banner: item.fields.banner,
        contenido: item.fields.contenido || "",
        fechaPublicacion: item.fields.fechaPublicacion || new Date().toISOString(),
        portada: portadaUrl, // ← URL real de la imagen
      };
      
      // Cachear la noticia
      cache.set(item.sys.id, noticia);
      return noticia;
    });
  } catch (error) {
    console.error("Error fetching noticias from Contentful:", error);
    return [];
  }
}

export async function fetchNoticiaById(id: string): Promise<Noticia | null> {
  if (cache.has(id)) {
    return cache.get(id) || null;
  }
  
  try {
    const response = await fetch(
      `${getContentDeliveryURL("pageBlogPost", "", 2)}&sys.id=${id}`
    );
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.items.length === 0) {
      return null;
    }
    
    // Crear mapa de assets incluidos
    const assetsMap = new Map();
    if (data.includes?.Asset) {
      data.includes.Asset.forEach((asset: any) => {
        assetsMap.set(asset.sys.id, asset);
      });
    }
    
    const item = data.items[0];
    const portadaUrl = getReferencedAssetUrl(assetsMap, item.fields.portada);
    
    const noticia: Noticia = {
      id: item.sys.id,
      titulo: item.fields.titulo || "Sin título",
      subtitulo: item.fields.subtitulo || "",
      banner: item.fields.banner,
      contenido: item.fields.contenido || "",
      fechaPublicacion: item.fields.fechaPublicacion || new Date().toISOString(),
      portada: portadaUrl,
    };
    
    cache.set(id, noticia);
    return noticia;
    
  } catch (error) {
    console.error(`Error fetching noticia ${id} from Contentful:`, error);
    return null;
  }
}