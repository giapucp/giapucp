"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { Evento } from "../../../types/types";
import { fetchEventosRecientes } from "../../../eventos/api/ContentfulEventos";
import EventoCard from "../../../eventos/components/EventoCard";
import EventoModal from "../../../eventos/components/EventoModal";
import styles from "./SeccionEventos.module.css";

export default function SeccionEventos() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvento, setSelectedEvento] = useState<Evento | null>(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchEventosRecientes(3);
        if (mounted) {
          setEventos(data);
        }
      } catch (err) {
        console.error("Error cargando eventos:", err);
        if (mounted) {
          setEventos([]);
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

  if (loading) {
    return (
      <section
        className={styles.container}
        id="seccion-eventos"
        aria-label="Cargando eventos"
      >
        <div className={styles.innerWrapper}>
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner} />
            <p>Cargando próximos eventos...</p>
          </div>
        </div>
      </section>
    );
  }

  if (eventos.length === 0) {
    return null; // No mostrar sección si no hay eventos
  }

  return (
    <section
      className={styles.container}
      id="seccion-eventos"
      aria-labelledby="seccion-eventos-title"
    >
      <div className={styles.innerWrapper}>
        {/* Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.titleWrapper}>
            <h2 id="seccion-eventos-title" className={styles.sectionTitle}>
              Próximos Eventos
            </h2>
            <p className={styles.sectionSubtitle}>
              Participa en nuestros talleres, charlas y conferencias.
            </p>
          </div>
          <Link
            href="/eventos"
            className={styles.viewAllLink}
            aria-label="Ver todos los eventos de GIA"
          >
            <span>Ver todos los eventos</span>
            <ArrowRight size={16} className={styles.viewAllArrow} />
          </Link>
        </div>

        {/* Grid de 2 eventos */}
        <div className={styles.eventsGrid}>
          {eventos.map((evento) => (
            <EventoCard
              key={evento.id}
              evento={evento}
              onClick={setSelectedEvento}
            />
          ))}
        </div>

        {/* Modal */}
        {selectedEvento && (
          <EventoModal
            evento={selectedEvento}
            onClose={() => setSelectedEvento(null)}
          />
        )}
      </div>
    </section>
  );
}
