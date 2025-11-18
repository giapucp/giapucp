"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import "./ModalNoticia.css";
import { Noticia } from "../../../types/types";
import { RichTextRenderer } from "../../../../components/comun/RichTextRenderer";

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
    
    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = "hidden";
    
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
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
        aria-labelledby="modal-noticia-title"
      >
        <button 
          className="modal-noticia-close" 
          onClick={onClose} 
          aria-label="Cerrar modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
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
        </div>
        
        <div className="modal-noticia-content">
          {/* Título movido a la sección de contenido */}
          <h1 id="modal-noticia-title" className="modal-noticia-title">
            {noticia.titulo}
          </h1>
          
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