"use client";

import React from "react";
import { Evento } from "../../types/types";
import styles from "./EventoCard.module.css";

interface EventoCardProps {
  evento: Evento;
  onClick: (evento: Evento) => void;
}

export default function EventoCard({ evento, onClick }: EventoCardProps) {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("es-PE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch {
      return "Fecha no disponible";
    }
  };

  return (
    <div
      className={styles.eventCard}
      onClick={() => onClick(evento)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick(evento);
      }}
      id={`event-card-${evento.id}`}
    >
      {/* Imagen */}
      <div className={styles.imageWrapper}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={evento.image}
          alt={evento.title}
          className={styles.eventImage}
        />
        <div className={styles.imageOverlay} />

        {/* Badge de estado */}
        <span
          className={`${styles.badge} ${
            evento.isActive ? styles.badgeActive : styles.badgeInactive
          }`}
        >
          {evento.isActive ? "Próximamente" : "Finalizado"}
        </span>
      </div>

      {/* Contenido */}
      <div className={styles.cardContent}>
        <h3 className={styles.eventTitle}>{evento.title}</h3>

        <div className={styles.eventMeta}>
          {/* Item: Fecha */}
          <div className={styles.metaItem}>
            <span className={styles.metaIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </span>
            <span className={styles.metaText}>{formatDate(evento.date)}</span>
          </div>

          {/* Item: Ubicación */}
          {evento.location && (
            <div className={styles.metaItem}>
              <span className={styles.metaIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </span>
              <span className={styles.metaText}>{evento.location}</span>
            </div>
          )}

          {/* Item: Organizador */}
          {evento.organizer && (
            <div className={styles.metaItem}>
              <span className={styles.metaIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </span>
              <span className={styles.metaText}>{evento.organizer}</span>
            </div>
          )}
          
        </div>
      </div>

      {/* Footer */}
      <div className={styles.cardFooter}>
        {evento.isActive ? (
          <button className={styles.registerBtn}>Registrarse</button>
        ) : (
          <p className={styles.endedLabel}>Evento finalizado</p>
        )}
      </div>
    </div>
  );
}
