// api/ContentfulMiembros.ts
/* eslint-disable */
import { getContentDeliveryURL} from "../../../api/ContentfulBase";
import { Miembro } from "../../types/types";

// Función helper para obtener datos de entradas referenciadas
function getReferencedEntry(entriesMap: Map<string, any>, reference: any, fieldName: string): string {
  if (!reference?.sys?.id) return `Sin ${fieldName}`;
  
  const entry = entriesMap.get(reference.sys.id);
  return entry?.fields?.nombre || `Sin ${fieldName}`;
}

// Función helper para obtener URLs de assets referenciados
function getReferencedAssetUrl(assetsMap: Map<string, any>, reference: any): string {
  if (!reference?.sys?.id) return "/placeholder.jpg";
  
  const asset = assetsMap.get(reference.sys.id);
  if (asset?.fields?.file?.url) {
    return `https:${asset.fields.file.url}`;
  }
  
  return "/placeholder.jpg";
}

export async function fetchMiembros(): Promise<Miembro[]> {
  try {
    const response = await fetch(getContentDeliveryURL("miembros", "", 2));
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Crear mapa de entradas incluidas
    const entriesMap = new Map();
    if (data.includes?.Entry) {
      data.includes.Entry.forEach((entry: any) => {
        entriesMap.set(entry.sys.id, entry);
      });
    }
    
    // Crear mapa de assets incluidos
    const assetsMap = new Map();
    if (data.includes?.Asset) {
      data.includes.Asset.forEach((asset: any) => {
        assetsMap.set(asset.sys.id, asset);
      });
    }
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.items.map((item: any) => {
      const areaNombre = getReferencedEntry(entriesMap, item.fields.area, "área");
      const cargoNombre = getReferencedEntry(entriesMap, item.fields.cargo, "cargo");
      
      // Obtener la URL de la foto desde los assets incluidos
      const fotoUrl = getReferencedAssetUrl(assetsMap, item.fields.foto);
      
      return {
        id: item.sys.id,
        nombres: item.fields.nombres || "Sin nombre",
        apellidopaterno: item.fields.apellidopaterno || "Sin apellido",
        foto: fotoUrl, // ← Usar la URL obtenida de los assets incluidos
        area: {
          nombre: areaNombre,
        },
        cargo: {
          nombre: cargoNombre,
        },
      };
    });
  } catch (error) {
    console.error("Error fetching miembros from Contentful:", error);
    return [];
  }
}