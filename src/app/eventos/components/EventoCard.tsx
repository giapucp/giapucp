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
          className={`${styles.badge} ${evento.isActive ? styles.badgeActive : styles.badgeInactive
            }`}
        >
          {evento.isActive ? "Próximamente" : "Finalizado"}
        </span>
      </div>

      {/* Contenido */}
      <div className={styles.cardContent}>
        <h3 className={styles.eventTitle}>{evento.title}</h3>

        <div className={styles.eventMeta}>
          <div className={styles.metaItem}>
            <span className={styles.metaIcon}>📅</span>
            <span className={styles.metaText}>{formatDate(evento.date)}</span>
          </div>

          {evento.location && (
            <div className={styles.metaItem}>
              <span className={styles.metaIcon}>📍</span>
              <span className={styles.metaText}>{evento.location}</span>
            </div>
          )}

          {evento.organizer && (
            <div className={styles.metaItem}>
              <span className={styles.metaIcon}>👤</span>
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
