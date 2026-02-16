/* eslint-disable */
import { getContentDeliveryURL, getImageUrl } from "../../../api/ContentfulBase";
import { Noticia} from "../../types/types";

function getReferencedAssetUrl(assetsMap: Map<string, any>, reference: any): string {
  if (!reference?.sys?.id) return "/placeholder-noticia.jpg";
  
  const asset = assetsMap.get(reference.sys.id);
  if (asset?.fields?.file?.url) {
    return `https:${asset.fields.file.url}`;
  }
  
  return "/placeholder-noticia.jpg";
}


export async function fetchNoticiasRecientes(limit = 4): Promise<Noticia[]> {
  try {
    const response = await fetch(
      `${getContentDeliveryURL("pageBlogPost", `order=-fields.fechaPublicacion&limit=${limit}`, 2)}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Crear mapa de assets incluidos
    const assetsMap = new Map();
    if (data.includes?.Asset) {
      data.includes.Asset.forEach((asset: any) => {
        assetsMap.set(asset.sys.id, asset);
      });
    }
    
    return data.items.map((item: any) => {
      const portadaUrl = getReferencedAssetUrl(assetsMap, item.fields.portada);
      
      return {
        id: item.sys.id,
        titulo: item.fields.titulo || "Sin título",
        subtitulo: item.fields.subtitulo || "",
        banner: item.fields.banner,
        contenido: item.fields.contenido || "",
        fechaPublicacion: item.fields.fechaPublicacion || new Date().toISOString(),
        portada: portadaUrl, // ← URL real de la imagen
      };
    });
    
  } catch (error) {
    console.error("Error fetching noticias recientes from Contentful:", error);
    return [];
  }
}
