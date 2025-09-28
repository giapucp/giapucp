import { API_URL, getImageUrl, StrapiData } from "../../api/strapiBase";
import { Miembro, MiembroResponse } from "../types/types";


export async function fetchMiembros(): Promise<Miembro[]> {
  try {
    const response = await fetch(`${API_URL}/miembros?populate=*`);
    const { data }: { data: MiembroResponse[] } = await response.json();
    return data
      .filter((miembro) => miembro.area_gia && miembro.area_gia.id)
      .map((miembro) => ({
        id: miembro.id,
        nombre: miembro.Nombres || "Sin nombre",
        apellidoPaterno: miembro.ApellidoPaterno || "Sin apellido",
        foto: miembro.foto?.data?.attributes?.url ? getImageUrl(miembro.foto as StrapiData) : "",
        area: {
          id: miembro.area_gia!.id,
          nombre: miembro.area_gia!.NombreArea || "Sin área",
        },
      }));
  } catch (error) {
    console.error("Error fetching miembros:", error);
    return [];
  }
}
