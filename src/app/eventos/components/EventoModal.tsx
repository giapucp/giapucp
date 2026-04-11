"use client";

import React, { useState, useEffect } from "react";
import { Evento } from "../../types/types";
import { registrarAsistente } from "../api/registroEvento";
import RichTextRenderer from "@/components/comun/RichTextRenderer";
import styles from "./EventoModal.module.css";

interface EventoModalProps {
  evento: Evento;
  onClose: () => void;
}

export default function EventoModal({ evento, onClose }: EventoModalProps) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cerrar con Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    // Bloquear scroll del body
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("es-PE", {
        weekday: "long",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!nombre.trim() || !apellido.trim() || !fechaNacimiento) {
      setError("Por favor completa todos los campos.");
      return;
    }

    setLoading(true);

    try {
      const result = await registrarAsistente({
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        fechaNacimiento,
        eventoNombre: evento.title,
      });

      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.message);
      }
    } catch {
      setError("Error inesperado. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      id="evento-modal-overlay"
    >
      <div className={styles.modal} role="dialog" aria-modal="true">
        {/* Botón cerrar */}
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Cerrar"
          id="evento-modal-close"
        >
          ✕
        </button>

        {/* Header con imagen */}
        <div className={styles.headerImage}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={evento.image}
            alt={evento.title}
            className={styles.headerImg}
          />
          <div className={styles.headerOverlay} />
          <span
            className={`${styles.headerBadge} ${evento.isActive
                ? styles.headerBadgeActive
                : styles.headerBadgeInactive
              }`}
          >
            {evento.isActive ? "● Inscripciones abiertas" : "Finalizado"}
          </span>
        </div>

        {/* Body */}
        <div className={styles.modalBody}>
          {/* Info del evento */}
          <div className={styles.eventInfo}>
            <h2 className={styles.eventTitle}>{evento.title}</h2>

            <div className={styles.metaGrid}>
              <div className={styles.metaCard}>
                <div className={styles.metaCardIcon}>📅</div>
                <div className={styles.metaCardInfo}>
                  <span className={styles.metaCardLabel}>Fecha y hora</span>
                  <span className={styles.metaCardValue}>
                    {formatDate(evento.date)}
                  </span>
                </div>
              </div>

              {evento.location && (
                <div className={styles.metaCard}>
                  <div className={styles.metaCardIcon}>📍</div>
                  <div className={styles.metaCardInfo}>
                    <span className={styles.metaCardLabel}>Ubicación</span>
                    <span className={styles.metaCardValue}>
                      {evento.location}
                    </span>
                  </div>
                </div>
              )}

              {evento.organizer && (
                <div className={styles.metaCard}>
                  <div className={styles.metaCardIcon}>👤</div>
                  <div className={styles.metaCardInfo}>
                    <span className={styles.metaCardLabel}>Organizador</span>
                    <span className={styles.metaCardValue}>
                      {evento.organizer}
                    </span>
                  </div>
                </div>
              )}



            </div>
          </div>

          {/* Descripción */}
          {evento.description && (
            <div className={styles.descriptionSection}>
              <h3 className={styles.descriptionTitle}>Acerca del evento</h3>
              <div className={styles.descriptionContent}>
                <RichTextRenderer content={evento.description} />
              </div>
            </div>
          )}

          <div className={styles.divider} />

          {/* Formulario o mensaje de evento finalizado */}
          {evento.isActive ? (
            <div className={styles.formSection}>
              {success ? (
                <div className={styles.successMessage}>
                  <span className={styles.successIcon}>🎉</span>
                  <h3 className={styles.successTitle}>
                    ¡Registro exitoso!
                  </h3>
                  <p className={styles.successText}>
                    Te has registrado para &quot;{evento.title}&quot;. ¡Te
                    esperamos!
                  </p>
                </div>
              ) : (
                <>
                  <h3 className={styles.formTitle}>Regístrate al evento</h3>
                  <p className={styles.formSubtitle}>
                    Completa tus datos para confirmar tu asistencia
                  </p>

                  <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputRow}>
                      <div className={styles.inputGroup}>
                        <label className={styles.inputLabel} htmlFor="reg-nombre">
                          Nombre
                        </label>
                        <input
                          id="reg-nombre"
                          type="text"
                          className={styles.input}
                          placeholder="Tu nombre"
                          value={nombre}
                          onChange={(e) => setNombre(e.target.value)}
                          required
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label className={styles.inputLabel} htmlFor="reg-apellido">
                          Apellido
                        </label>
                        <input
                          id="reg-apellido"
                          type="text"
                          className={styles.input}
                          placeholder="Tu apellido"
                          value={apellido}
                          onChange={(e) => setApellido(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <label
                        className={styles.inputLabel}
                        htmlFor="reg-fecha-nacimiento"
                      >
                        Fecha de Nacimiento
                      </label>
                      <input
                        id="reg-fecha-nacimiento"
                        type="date"
                        className={styles.input}
                        value={fechaNacimiento}
                        onChange={(e) => setFechaNacimiento(e.target.value)}
                        required
                      />
                    </div>

                    {error && (
                      <div className={styles.errorMessage}>{error}</div>
                    )}

                    <button
                      type="submit"
                      className={styles.submitBtn}
                      disabled={loading}
                      id="evento-submit-btn"
                    >
                      {loading ? (
                        <span className={styles.btnLoading}>
                          <span className={styles.spinner} />
                          Registrando...
                        </span>
                      ) : (
                        "Confirmar registro"
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          ) : (
            <div className={styles.endedMessage}>
              <span className={styles.endedIcon}>⏰</span>
              <h3 className={styles.endedTitle}>Evento finalizado</h3>
              <p className={styles.endedText}>
                Este evento ya se realizó. Mantente atento a próximos eventos.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
