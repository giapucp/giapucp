import React from "react";
import "./TarjetaNoticia.css";
import Image from "next/image";
import { Noticia } from "@/app/(inicio)/types/types";

interface TarjetaNoticiaProps {
  noticia: Noticia;
  onClick: () => void;
}

const TarjetaNoticia: React.FC<TarjetaNoticiaProps> = ({ noticia, onClick }) => {
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
        <div className="tarjeta-noticia-summary">
            {noticia.textoFinal ? noticia.textoFinal.length > 30
              ? noticia.textoFinal.substring(0, 40) + "..."
              : noticia.textoFinal
            : ""}
          <p className="tarjeta-noticia-date">
            {noticia.fechaPublicacion || "Fecha no disponible"}
          </p>  
        </div>
      </div>
    </div>
  );
};

export default TarjetaNoticia;
