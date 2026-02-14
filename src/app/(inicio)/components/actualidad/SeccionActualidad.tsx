"use client";

import React, { useEffect, useState } from "react";
import { fetchNoticiasRecientes } from "../../api/ContentfulInicio";
import { Noticia } from "../../../types/types";
import styles from "./SeccionActualidad.module.css";

export default function SeccionActualidad() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchNoticiasRecientes(10);
        if (mounted) {
          setNoticias(data);
          setError(null);
        }
      } catch (err) {
        console.error("Error cargando noticias:", err);
        if (mounted) {
          setError("Error al cargar las noticias");
          setNoticias([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const handleSelectNews = (index: number) => {
    setCurrentIndex(index);
  };

  const getDescripcion = (noticia: Noticia): string => {
    if (noticia.subtitulo) {
      return noticia.subtitulo.length > 200 
        ? noticia.subtitulo.substring(0, 200) + "..."
        : noticia.subtitulo;
    }
    return "Sin descripción disponible";
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('es', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }).format(date);
    } catch {
      return "";
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner} />
        <p>Cargando noticias...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>{error}</p>
        <button 
          className={styles.retryButton}
          onClick={() => window.location.reload()}
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (noticias.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <p>No hay noticias disponibles en este momento.</p>
      </div>
    );
  }

  const currentNews = noticias[currentIndex];
  const otherNews = noticias.filter((_, index) => index !== currentIndex);

  return (
    <div className={styles.container}>
      <h2 className={styles.titleRecent}>Actualidad</h2>

      <div className={styles.mainLayout}>
        {/* Columna principal - Noticia destacada */}
        <div className={styles.featuredColumn}>
          <div 
            className={styles.featuredImage}
            style={{
              backgroundImage: `url(${currentNews.portada || "/placeholder-noticia.jpg"})`
            }}
          >
            <div className={styles.featuredContent}>
              <h3 className={styles.featuredTitle}>
                {currentNews.titulo}
              </h3>
              <p className={styles.featuredDescription}>
                {getDescripcion(currentNews)}
              </p>
            </div>
          </div>
        </div>

        {/* Columna secundaria - Noticias antiguas */}
        <div className={styles.secondaryColumn}>
          {otherNews.map((noticia, idx) => {
            const originalIndex = noticias.findIndex(n => n.id === noticia.id);
            return (
              <div
                key={noticia.id}
                className={`${styles.oldNewsCard} ${
                  originalIndex === currentIndex ? styles.active : ""
                }`}
                onClick={() => handleSelectNews(originalIndex)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleSelectNews(originalIndex);
                  }
                }}
              >
                <div 
                  className={styles.oldNewsImage}
                  style={{
                    backgroundImage: `url(${noticia.portada || "/placeholder-noticia.jpg"})`
                  }}
                />
                <div className={styles.oldNewsContent}>
                  <h4 className={styles.oldNewsTitle}>
                    {noticia.titulo}
                  </h4>
                  <span className={styles.oldNewsDate}>
                    {formatDate(noticia.fechaPublicacion)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}