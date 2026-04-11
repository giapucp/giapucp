"use server"
/* eslint-disable */
import { getContentDeliveryURL } from "../../../api/ContentfulBase";
import { Evento } from "../../types/types";

// Helper para obtener URLs de assets referenciados
function getReferencedAssetUrl(assetsMap: Map<string, any>, reference: any): string {
  if (!reference?.sys?.id) return "/placeholder-evento.jpg";
  
  const asset = assetsMap.get(reference.sys.id);
  if (asset?.fields?.file?.url) {
    return `https:${asset.fields.file.url}`;
  }
  
  return "/placeholder-evento.jpg";
}

// Determina si un evento está activo (fecha >= hoy)
function checkEventActive(dateString: string): boolean {
  const eventDate = new Date(dateString);
  const now = new Date();
  // Considerar el evento activo si su fecha es hoy o en el futuro
  // Comparamos solo fechas (sin hora) para dar margen todo el día del evento
  const eventDay = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return eventDay >= today;
}

// Procesa items de Contentful a tipo Evento
function processEventItems(data: any): Evento[] {
  const assetsMap = new Map();
  if (data.includes?.Asset) {
    data.includes.Asset.forEach((asset: any) => {
      assetsMap.set(asset.sys.id, asset);
    });
  }

  return data.items.map((item: any) => {
    const imageUrl = getReferencedAssetUrl(assetsMap, item.fields.image);
    
    return {
      id: item.sys.id,
      title: item.fields.title || "Sin título",
      description: item.fields.description || null,
      date: item.fields.date || new Date().toISOString(),
      location: item.fields.location || null,
      organizer: item.fields.organizer || "",
      image: imageUrl,
      isActive: checkEventActive(item.fields.date || ""),
    };
  });
}

export async function fetchEventos(): Promise<Evento[]> {
  try {
    const url = `${getContentDeliveryURL("event", "", 2)}&order=-fields.date`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    return processEventItems(data);
    
  } catch (error) {
    console.error("Error fetching eventos from Contentful:", error);
    return [];
  }
}

export async function fetchEventosRecientes(limit = 2): Promise<Evento[]> {
  try {
    const response = await fetch(
      `${getContentDeliveryURL("event", `order=-fields.date&limit=${limit}`, 2)}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return processEventItems(data);
    
  } catch (error) {
    console.error("Error fetching eventos recientes from Contentful:", error);
    return [];
  }
}

export async function fetchEventoById(id: string): Promise<Evento | null> {
  try {
    const response = await fetch(
      `${getContentDeliveryURL("event", "", 2)}&sys.id=${id}`
    );
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.items.length === 0) {
      return null;
    }
    
    const eventos = processEventItems(data);
    return eventos[0] || null;
    
  } catch (error) {
    console.error(`Error fetching evento ${id} from Contentful:`, error);
    return null;
  }
}
