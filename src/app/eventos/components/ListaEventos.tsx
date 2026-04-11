"use client";

import React, { useEffect, useState } from "react";
import { Evento } from "../../types/types";
import { fetchEventos } from "../api/ContentfulEventos";
import EventoCard from "./EventoCard";
import EventoModal from "./EventoModal";
import styles from "./ListaEventos.module.css";

type FilterType = "todos" | "proximos" | "pasados";

export default function ListaEventos() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvento, setSelectedEvento] = useState<Evento | null>(null);
  const [filter, setFilter] = useState<FilterType>("todos");

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchEventos();
        if (mounted) {
          setEventos(data);
          setError(null);
        }
      } catch (err) {
        console.error("Error cargando eventos:", err);
        if (mounted) {
          setError("Error al cargar los eventos");
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

  const filteredEventos = eventos.filter((evento) => {
    if (filter === "proximos") return evento.isActive;
    if (filter === "pasados") return !evento.isActive;
    return true;
  });

  // Ordenar: activos primero, luego por fecha descendente
  const sortedEventos = [...filteredEventos].sort((a, b) => {
    if (a.isActive && !b.isActive) return -1;
    if (!a.isActive && b.isActive) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

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

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <p>{error}</p>
          <button
            className={styles.retryButton}
            onClick={() => window.location.reload()}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.innerWrapper}>
        {/* Filtros */}
        <div className={styles.header}>
          <div className={styles.filterGroup}>
            <button
              className={`${styles.filterBtn} ${filter === "todos" ? styles.filterBtnActive : ""}`}
              onClick={() => setFilter("todos")}
              id="filter-todos"
            >
              Todos
            </button>
            <button
              className={`${styles.filterBtn} ${filter === "proximos" ? styles.filterBtnActive : ""}`}
              onClick={() => setFilter("proximos")}
              id="filter-proximos"
            >
              Próximos
            </button>
            <button
              className={`${styles.filterBtn} ${filter === "pasados" ? styles.filterBtnActive : ""}`}
              onClick={() => setFilter("pasados")}
              id="filter-pasados"
            >
              Pasados
            </button>
          </div>
        </div>

        {/* Grid de eventos */}
        <div className={styles.eventsGrid}>
          {sortedEventos.length === 0 ? (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>🗓️</span>
              <h3 className={styles.emptyTitle}>No hay eventos</h3>
              <p className={styles.emptyText}>
                {filter === "proximos"
                  ? "No hay eventos próximos por el momento."
                  : filter === "pasados"
                    ? "No hay eventos pasados registrados."
                    : "No hay eventos disponibles en este momento."}
              </p>
            </div>
          ) : (
            sortedEventos.map((evento) => (
              <EventoCard
                key={evento.id}
                evento={evento}
                onClick={setSelectedEvento}
              />
            ))
          )}
        </div>

        {/* Modal */}
        {selectedEvento && (
          <EventoModal
            evento={selectedEvento}
            onClose={() => setSelectedEvento(null)}
          />
        )}
      </div>
    </div>
  );
}
