/**
 * Copia un texto al portapapeles. Devuelve true si tuvo éxito.
 * @param text Texto a copiar
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!text) return false;
  if (navigator?.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }
  return false;
}

/**
 * Intenta compartir la página usando la API nativa o copia el enlace si no está disponible.
 * @param shareData Objeto con título, texto y url
 * @returns true si se compartió, false si solo se copió
 */
export async function sharePage(shareData: { title: string; text: string; url: string }): Promise<boolean> {
  if (navigator?.share) {
    try {
      await navigator.share(shareData);
      return true;
    } catch {
      // Si el usuario cancela o no soporta, fallback abajo
    }
  }
  if (navigator?.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(shareData.url);
    } catch {}
    return false;
  }
  return false;
}

/**
 * Abre WhatsApp con un mensaje y enlace.
 * @param text Texto a compartir
 * @param url URL a compartir
 */
export function shareWhatsApp(text: string, url: string) {
  const fullText = `${text} ${url}`;
  const encoded = encodeURIComponent(fullText);
  const waUrl = `https://api.whatsapp.com/send?text=${encoded}`;
  if (typeof window !== "undefined") {
    window.open(waUrl, "_blank");
  }
}
