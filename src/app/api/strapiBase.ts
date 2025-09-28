export const API_URL =
  (process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337/") + "api";
export const BASE_URL = API_URL.replace("/api", "");

interface ImageData {
  url: string;
}

export interface StrapiData {
  data?: { attributes?: ImageData };
  attributes?: ImageData;
}

export function getImageUrl(
  foto: StrapiData | ImageData | undefined | null,
  placeholder = "/placeholder.jpg"
): string {
  const imageData = (foto && "data" in foto) ? foto.data?.attributes : foto;
  if (!(imageData && "url" in imageData && typeof imageData.url === "string")) return placeholder;
  return imageData && "url" in imageData && typeof imageData.url === "string" && imageData.url.startsWith("http")
    ? imageData.url
    : `${BASE_URL}${(imageData as ImageData)?.url ?? placeholder}`;
}
