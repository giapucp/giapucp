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
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [correo, setCorreo] = useState("");
  const [institucion, setInstitucion] = useState("");
  const [institucionOtro, setInstitucionOtro] = useState("");
  const [aceptaPublicidad, setAceptaPublicidad] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
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

    if (!nombreCompleto.trim() || !correo.trim() || !institucion || !aceptaPublicidad) {
      setError("Por favor completa todos los campos requeridos.");
      return;
    }

    if (institucion === "Otro" && !institucionOtro.trim()) {
      setError("Por favor especifica tu institución.");
      return;
    }

    setLoading(true);

    try {
      const result = await registrarAsistente({
        nombre: nombreCompleto.trim(),
        correo: correo.trim(),
        institucion,
        institucionOtro: institucion === "Otro" ? institucionOtro.trim() : "",
        aceptaPublicidad,
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
            className={`${styles.headerBadge} ${
              evento.isActive ? styles.headerBadgeActive : styles.headerBadgeInactive
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
              {/* Card: Fecha */}
              <div className={styles.metaCard}>
                <div className={styles.metaCardIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </div>
                <div className={styles.metaCardInfo}>
                  <span className={styles.metaCardLabel}>Fecha y hora</span>
                  <span className={styles.metaCardValue}>{formatDate(evento.date)}</span>
                </div>
              </div>

              {/* Card: Ubicación */}
              {evento.location && (
                <div className={styles.metaCard}>
                  <div className={styles.metaCardIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  </div>
                  <div className={styles.metaCardInfo}>
                    <span className={styles.metaCardLabel}>Ubicación</span>
                    <span className={styles.metaCardValue}>{evento.location}</span>
                  </div>
                </div>
              )}

              {/* Card: Organizador */}
              {evento.organizer && (
                <div className={styles.metaCard}>
                  <div className={styles.metaCardIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  </div>
                  <div className={styles.metaCardInfo}>
                    <span className={styles.metaCardLabel}>Organizador</span>
                    <span className={styles.metaCardValue}>{evento.organizer}</span>
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
                  {/* Contenedor con flexbox para centrar perfectamente el SVG en cualquier resolución */}
                  <div style={{ display: "flex", justifyContent: "center", width: "100%", marginBottom: "16px" }}>
                    <span className={styles.successIcon} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </span>
                  </div>
                  <h3 className={styles.successTitle}>¡Registro exitoso!</h3>
                  <p className={styles.successText}>
                    Te has registrado para &quot;{evento.title}&quot;. ¡Te esperamos!
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
                          Nombres y Apellidos
                        </label>
                        <input
                          id="reg-nombre"
                          type="text"
                          className={styles.input}
                          placeholder="Tu nombre completo"
                          value={nombreCompleto}
                          onChange={(e) => setNombreCompleto(e.target.value)}
                          required
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label className={styles.inputLabel} htmlFor="reg-correo">
                          Correo Electrónico
                        </label>
                        <input
                          id="reg-correo"
                          type="email"
                          className={styles.input}
                          placeholder="ejemplo@correo.com"
                          value={correo}
                          onChange={(e) => setCorreo(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel} htmlFor="reg-institucion">
                        Institución de Procedencia
                      </label>
                      <select
                        id="reg-institucion"
                        className={styles.input}
                        value={institucion}
                        onChange={(e) => setInstitucion(e.target.value)}
                        required
                      >
                        <option value="" disabled hidden>
                          Selecciona tu institución
                        </option>
                        <option value="PUCP">PUCP</option>
                        <option value="Otra universidad">Otra universidad</option>
                        <option value="Empresa/Institución">Empresa / Institución</option>
                        <option value="Público general">Público general</option>
                        <option value="Otro">Otro (Especificar)</option>
                      </select>
                    </div>

                    {institucion === "Otro" && (
                      <div className={styles.inputGroup}>
                        <label className={styles.inputLabel} htmlFor="reg-institucion-otro">
                          Especifica tu Institución
                        </label>
                        <input
                          id="reg-institucion-otro"
                          type="text"
                          className={styles.input}
                          placeholder="Nombre de tu institución o colegio"
                          value={institucionOtro}
                          onChange={(e) => setInstitucionOtro(e.target.value)}
                          required
                        />
                      </div>
                    )}

                    {/* Sección Boletín Informativo con textos corregidos a color Blanco */}
                    <div className={styles.inputGroup} style={{ marginTop: "12px" }}>
                      <label className={styles.inputLabel} style={{ marginBottom: "8px", lineHeight: "1.4" }}>
                        ¿Te gustaría recibir información sobre futuros proyectos, eventos y oportunidades del GIA PUCP?
                      </label>
                      <div style={{ display: "flex", gap: "24px", marginTop: "4px" }}>
                        <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                          <input
                            type="radio"
                            name="publicidad"
                            value="Sí, deseo recibir información."
                            checked={aceptaPublicidad === "Sí, deseo recibir información."}
                            onChange={(e) => setAceptaPublicidad(e.target.value)}
                            required
                            style={{ cursor: "pointer", accentColor: "var(--primary-color, #0056b3)" }}
                          />
                          <span style={{ color: "#ffffff" }}>Sí, deseo recibir información.</span>
                        </label>
                        <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                          <input
                            type="radio"
                            name="publicidad"
                            value="No, gracias."
                            checked={aceptaPublicidad === "No, gracias."}
                            onChange={(e) => setAceptaPublicidad(e.target.value)}
                            style={{ cursor: "pointer", accentColor: "var(--primary-color, #0056b3)" }}
                          />
                          <span style={{ color: "#ffffff" }}>No, gracias.</span>
                        </label>
                      </div>
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
              <div style={{ display: "flex", justifyContent: "center", width: "100%", marginBottom: "16px" }}>
                <span className={styles.endedIcon} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline></svg>
                </span>
              </div>
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