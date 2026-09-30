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
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Fecha no disponible";
    try {
      return new Intl.DateTimeFormat("es-PE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(new Date(dateString));
    } catch {
      return "Fecha no disponible";
    }
  };

  return (
    <div className="modal-noticia-overlay" onClick={onClose}>
      <div
        className="modal-noticia-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-noticia-title"
      >
        {/* Botón cerrar */}
        <button
          className="modal-noticia-close"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18" />
            <path d="M6 6L18 18" />
          </svg>
        </button>

        {/* Header con imagen */}
        <div className="modal-noticia-header">
          <Image
            src={noticia.portada || "/placeholder.jpg"}
            alt={noticia.titulo || "Noticia"}
            className="modal-noticia-image"
            width={900}
            height={280}
            loading="lazy"
          />
          <div className="modal-noticia-gradient" />
        </div>

        {/* Body */}
        <div className="modal-noticia-content">
          {/* Título */}
          <h1 id="modal-noticia-title" className="modal-noticia-title">
            {noticia.titulo}
          </h1>

          {/* Meta card: fecha */}
          <div className="modal-noticia-date">
            <div className="modal-noticia-date-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <div className="modal-noticia-date-info">
              <span className="modal-noticia-date-label">Fecha de publicación</span>
              <span className="modal-noticia-date-value">
                {formatDate(noticia.fechaPublicacion)}
              </span>
            </div>
          </div>

          {/* Contenido */}
          <div>
            <h3 className="modal-noticia-section-title">Contenido</h3>
            <div className="modal-noticia-body">
              <RichTextRenderer content={noticia.contenido} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalNoticia;