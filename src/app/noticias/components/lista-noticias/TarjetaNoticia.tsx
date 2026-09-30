import React from "react";
import "./TarjetaNoticia.css";
import Image from "next/image";
import { Noticia } from "../../../types/types";


interface TarjetaNoticiaProps {
  noticia: Noticia;
  onClick: () => void;
}

const TarjetaNoticia: React.FC<TarjetaNoticiaProps> = ({ noticia, onClick }) => {


  const formatDate = (dateString?: string) => {
    if (!dateString) return "Fecha no disponible";
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('es-PE', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }).format(date);
    } catch {
      return "Fecha no disponible";
    }
  };

  return (
    <div
      className="tarjeta-noticia"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
    >
      <div className="imageWrapper">
        <Image
          src={noticia.portada || "/placeholder.jpg"}
          alt={noticia.titulo || "Noticia"}
          width={500}
          height={300}
          className="tarjeta-noticia-image"
          loading="lazy"
        />
      </div>

      <div className="tarjeta-noticia-info">
        <h2 className="tarjeta-noticia-title">{noticia.titulo}</h2>
        <div className="tarjeta-noticia-meta">
          <p className="tarjeta-noticia-date">
            {formatDate(noticia.fechaPublicacion)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TarjetaNoticia;