"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import "./ModalNoticia.css";
import { Noticia } from "../../../types/types";
import { RichTextRenderer } from "../../../../components/comun/RichTextRenderer"; // Ajusta la ruta según tu estructura

interface ModalNoticiaProps {
  noticia: Noticia;
  onClose: () => void;
}

const ModalNoticia: React.FC<ModalNoticiaProps> = ({ noticia, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="modal-noticia-overlay" onClick={onClose}>
      <div
        className={`modal-noticia-container ${noticia ? "show" : ""}`}
        onClick={(e) => e.stopPropagation()}
        tabIndex={0}
        role="dialog"
        aria-modal="true"
      >
        <button className="modal-noticia-close" onClick={onClose} aria-label="Cerrar">
          &times;
        </button>
        <div className="modal-noticia-header">
          <Image
            src={noticia.portada || "/placeholder.jpg"}
            alt={noticia.titulo || "Noticia"}
            className="modal-noticia-image"
            width={500}
            height={300}
            loading="lazy"
            unoptimized={true}
          />
          <div className="modal-noticia-gradient"></div>
          <h2 className="modal-noticia-title">{noticia.titulo}</h2>
        </div>
        <div className="modal-noticia-content">
          <p className="modal-noticia-date">
            {noticia.fechaPublicacion 
              ? new Date(noticia.fechaPublicacion).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
              : "Fecha no disponible"}
          </p>
          
          <div className="modal-noticia-body">
            <RichTextRenderer content={noticia.contenido} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalNoticia;