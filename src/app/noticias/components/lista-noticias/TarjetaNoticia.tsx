import React from "react";
import "./TarjetaNoticia.css";
import Image from "next/image";
import { Noticia } from "../../../types/types";

interface TarjetaNoticiaProps {
  noticia: Noticia;
  onClick: () => void;
}

// Función para extraer texto plano del RichText
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const extractPlainText = (content: any): string => {
  if (!content) return "";
  
  // Si es string, devolver directamente
  if (typeof content === 'string') {
    return content;
  }
  
  // Si es RichText de Contentful, extraer texto
  if (content.nodeType === 'document' && content.content) {
    let text = '';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const extractText = (nodes: any[]) => {
      nodes.forEach(node => {
        if (node.nodeType === 'text') {
          text += node.value + ' ';
        } else if (node.content && Array.isArray(node.content)) {
          extractText(node.content);
        }
      });
    };
    extractText(content.content);
    return text.trim();
  }
  
  return "Contenido no disponible";
};

const TarjetaNoticia: React.FC<TarjetaNoticiaProps> = ({ noticia, onClick }) => {
  const descripcion = noticia.subtitulo || extractPlainText(noticia.contenido);

  return (
    <div
      className="tarjeta-noticia cursor-pointer"
      onClick={onClick}
      tabIndex={0}
      role="button"
    >
      <Image
        src={noticia.portada || "/placeholder.jpg"}
        alt={noticia.titulo || "Noticia"}
        width={500}
        height={300}
        unoptimized={true}
        className="tarjeta-noticia-image"
        loading="lazy"
      />

      <div className="tarjeta-noticia-info">
        <h2 className="tarjeta-noticia-title">{noticia.titulo}</h2>
        
        {descripcion && (
          <p className="tarjeta-noticia-subtitle">
            {descripcion.length > 100
              ? descripcion.substring(0, 100) + "..."
              : descripcion}
          </p>
        )}
        
        <p className="tarjeta-noticia-date">
          {noticia.fechaPublicacion 
            ? new Date(noticia.fechaPublicacion).toLocaleDateString('es-ES')
            : "Fecha no disponible"}
        </p>  
      </div>
    </div>
  );
};

export default TarjetaNoticia;