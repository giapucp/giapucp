"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
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
        const data = await fetchEventosRecientes(2);
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
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner} />
          <p>Cargando eventos...</p>
        </div>
      </div>
    );
  }

  if (eventos.length === 0) {
    return null; // No mostrar sección si no hay eventos
  }

  return (
    <section className={styles.container} id="seccion-eventos">
      {/* Header */}
      <div className={styles.sectionHeader}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.sectionTitle}>Eventos</h2>
          <p className={styles.sectionSubtitle}>
            Participa en nuestros próximos eventos y actividades
          </p>
        </div>
        <Link href="/eventos" className={styles.viewAllLink}>
          Ver todos
          <span className={styles.viewAllArrow}>→</span>
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
    </section>
  );
}
