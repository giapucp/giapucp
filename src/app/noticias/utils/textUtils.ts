// src/app/noticias/utils/textUtils.ts

/**
 * Normaliza un texto eliminando acentos y convirtiéndolo a minúsculas
 * para comparaciones de búsqueda flexibles en español.
 */
export function normalizeText(text: string): string {
  if (!text) return "";
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

/**
 * Extrae texto plano de strings o del formato RichText de Contentful.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function extractPlainText(content: any): string {
  if (!content) return "";

  if (typeof content === "string") {
    return content;
  }

  if (content.nodeType === "document" && content.content) {
    let text = "";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const extractText = (nodes: any[]) => {
      nodes.forEach((node) => {
        if (node.nodeType === "text" && node.value) {
          text += node.value + " ";
        } else if (node.content && Array.isArray(node.content)) {
          extractText(node.content);
        }
      });
    };
    extractText(content.content);
    return text.trim();
  }

  return "";
}
