"use client";

import React from "react";
import Image from "next/image";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
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
        <Image
          src={evento.image || "/placeholder.jpg"}
          alt={evento.title}
          fill
          className={styles.eventImage}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
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
        {/* Lugar / Categoría */}
        <div className={styles.metaRow}>
          <MapPin size={13} className={styles.metaIcon} aria-hidden="true" />
          <span className={styles.metaLocation}>
            {evento.location || "Lima, Perú"}
          </span>
        </div>

        {/* Título */}
        <h3 className={styles.eventTitle}>{evento.title}</h3>

        {/* Footer con fecha y acción */}
        <div className={styles.cardFooter}>
          <div className={styles.eventDate}>
            <Calendar size={13} className={styles.dateIcon} aria-hidden="true" />
            <span>{formatDate(evento.date)}</span>
          </div>
          <span className={styles.detailsCta}>
            <span>Detalles</span>
            <ArrowRight size={13} className={styles.detailsArrow} />
          </span>
        </div>
      </div>
    </div>
  );
}
