"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  ArrowRight,
  ExternalLink,
  Pause,
  Play,
  Sparkles
} from "lucide-react";
import { fetchNoticiasRecientes } from "../../api/ContentfulInicio";
import { Noticia } from "../../../types/types";
import ModalNoticia from "@/app/noticias/components/modal-noticia/ModalNoticia";
import styles from "./HeroNoticiasCarousel.module.css";

const SLIDE_DURATION = 6000; // 6 seconds per slide

export default function HeroNoticiasCarousel() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  // animKey increments on each slide change to restart the CSS progress animation
  const [animKey, setAnimKey] = useState(0);
  // resumeKey increments on pathname change or tab focus to force-retrigger the autoplay effect
  const [resumeKey, setResumeKey] = useState(0);
  const [selectedNoticia, setSelectedNoticia] = useState<Noticia | null>(null);

  const pathname = usePathname();

  // Touch tracking for swipe
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  // Single timeout ref for slide auto-advance
  const slideTimerRef = useRef<NodeJS.Timeout | null>(null);
  // Track how much time has elapsed on the current slide (for pause/resume sync)
  const slideStartTimeRef = useRef<number>(Date.now());
  const elapsedAtPauseRef = useRef<number>(0);

  // Fetch recent news
  useEffect(() => {
    let mounted = true;

    const loadNews = async () => {
      try {
        setLoading(true);
        const data = await fetchNoticiasRecientes(6);
        if (mounted) {
          setNoticias(data);
        }
      } catch (err) {
        console.error("Error al cargar noticias para el hero:", err);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadNews();

    return () => {
      mounted = false;
    };
  }, []);

  const totalSlides = noticias.length;

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setAnimKey(k => k + 1); // restart CSS progress animation
    elapsedAtPauseRef.current = 0;
    slideStartTimeRef.current = Date.now();
  }, []);

  const handleNext = useCallback(() => {
    if (totalSlides === 0) return;
    goToSlide((currentIndex + 1) % totalSlides);
  }, [currentIndex, totalSlides, goToSlide]);

  const handlePrev = useCallback(() => {
    if (totalSlides === 0) return;
    goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
  }, [currentIndex, totalSlides, goToSlide]);

  // Reset carousel whenever the user navigates back to the home page (SPA navigation).
  // Next.js App Router client-side navigation does NOT fire visibilitychange —
  // usePathname is the reliable signal that the route changed.
  // We also reset isPaused because onMouseLeave may not fire during SPA transitions,
  // leaving the hover-pause state permanently stuck.
  useEffect(() => {
    setIsPaused(false);           // clear any stuck hover-pause state
    elapsedAtPauseRef.current = 0;
    slideStartTimeRef.current = Date.now();
    setAnimKey(k => k + 1);    // restart CSS progress bar from 0
    setResumeKey(k => k + 1);  // force a new setTimeout in the autoplay effect
  }, [pathname]);

  // Handle real tab-switch / window minimize (document hidden → visible).
  // On 'visible': reset isPaused because onMouseEnter can fire before this handler
  // when the window is restored, and the hover-pause state was never cleared.
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setIsPaused(false);         // ← key fix: clear potentially stale hover-pause
        elapsedAtPauseRef.current = 0;
        slideStartTimeRef.current = Date.now();
        setAnimKey(k => k + 1);
        setResumeKey(k => k + 1);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Autoplay: pure CSS animation handles the visual progress bar.
  // JS only fires a single setTimeout (for the remaining duration) to advance the slide.
  useEffect(() => {
    const isPausedNow = isPaused || userPaused || !!selectedNoticia;

    if (loading || totalSlides <= 1) {
      if (slideTimerRef.current) clearTimeout(slideTimerRef.current);
      return;
    }

    if (isPausedNow) {
      // Record how much time has passed so far on this slide
      if (slideTimerRef.current) clearTimeout(slideTimerRef.current);
      elapsedAtPauseRef.current += Date.now() - slideStartTimeRef.current;
      return;
    }

    // Resume: schedule only the remaining time
    slideStartTimeRef.current = Date.now();
    const remaining = Math.max(0, SLIDE_DURATION - elapsedAtPauseRef.current);

    slideTimerRef.current = setTimeout(() => {
      handleNext();
    }, remaining);

    return () => {
      if (slideTimerRef.current) clearTimeout(slideTimerRef.current);
    };
  }, [loading, totalSlides, currentIndex, isPaused, userPaused, selectedNoticia, handleNext, resumeKey]);

  // Helper date formatter
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("es-PE", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(date);
    } catch {
      return "";
    }
  };

  const getExcerpt = (noticia: Noticia) => {
    if (noticia.subtitulo && noticia.subtitulo.trim().length > 0) {
      return noticia.subtitulo.length > 210
        ? noticia.subtitulo.substring(0, 210) + "..."
        : noticia.subtitulo;
    }
    return "Conoce los avances, proyectos tecnológicos e investigaciones más recientes del Grupo de Investigación Aeroespacial de la PUCP.";
  };

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      handlePrev();
    } else if (e.key === "ArrowRight") {
      handleNext();
    }
  };

  if (loading) {
    return (
      <section className={styles.loadingContainer} aria-label="Cargando carrusel de noticias">
        <div className={styles.spinner} />
        <p className="text-gray-300 font-medium">Cargando las últimas noticias...</p>
      </section>
    );
  }

  if (noticias.length === 0) {
    return (
      <section className={styles.emptyContainer} aria-label="Hero GIA PUCP">
        <div className={styles.starfield} />
        <h1 className="text-4xl md:text-6xl font-bold font-display tracking-wider">
          GRUPO DE INVESTIGACIÓN AEROESPACIAL
        </h1>
        <p className="max-w-xl text-gray-300 text-lg">
          Impulsando proyectos de cohetería experimental, tecnología satelital y exploración espacial desde el Perú.
        </p>
        <Link href="/noticias" className={styles.btnPrimary}>
          <span>Ir a Noticias</span>
          <ArrowRight size={18} />
        </Link>
      </section>
    );
  }

  return (
    <>
      <section
        className={styles.heroContainer}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Noticias recientes de GIA PUCP"
      >
        {/* Animated starfield background */}
        <div className={styles.starfield} aria-hidden="true" />

        {/* Slides Track */}
        <div className={styles.slidesTrack}>
          {noticias.map((noticia, index) => {
            const isActive = index === currentIndex;
            return (
              <article
                key={noticia.id}
                className={`${styles.slide} ${isActive ? styles.slideActive : ""}`}
                aria-hidden={!isActive}
              >
                {/* Background Image */}
                <div
                  className={styles.slideBackground}
                  style={{
                    backgroundImage: `url(${noticia.portada || "/placeholder-noticia.jpg"})`,
                  }}
                  aria-hidden="true"
                />

                {/* Overlays */}
                <div className={styles.gradientOverlay} aria-hidden="true" />
                <div className={styles.vignette} aria-hidden="true" />

                {/* Slide Content */}
                <div className={styles.contentContainer}>
                  <div className={styles.contentInner}>
                    {/* Badge & Date */}
                    <div className={styles.badgeWrapper}>
                      {noticia.fechaPublicacion && (
                        <span className={styles.dateBadge}>
                          <Calendar size={14} className="text-sky-400" />
                          <span>{formatDate(noticia.fechaPublicacion)}</span>
                        </span>
                      )}
                    </div>

                    {/* Headline */}
                    <h2 className={styles.title}>
                      {noticia.titulo}
                    </h2>

                    {/* Excerpt */}
                    <p className={styles.description}>
                      {getExcerpt(noticia)}
                    </p>

                    {/* Action Buttons */}
                    <div className={styles.actionsRow}>
                      <button
                        type="button"
                        onClick={() => setSelectedNoticia(noticia)}
                        className={styles.btnPrimary}
                        aria-label={`Leer noticia completa: ${noticia.titulo}`}
                      >
                        <span>Leer noticia</span>
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Side Arrows (Desktop) */}
        {totalSlides > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className={`${styles.navArrow} ${styles.navArrowPrev}`}
              aria-label="Noticia anterior"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className={`${styles.navArrow} ${styles.navArrowNext}`}
              aria-label="Noticia siguiente"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Bottom Controls Bar */}
        <div className={styles.bottomControls}>
          {/* Indicators with progress bar */}
          <div className={styles.indicatorsList} role="tablist" aria-label="Seleccionar noticia">
            {noticias.map((noticia, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={noticia.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Ir a noticia ${idx + 1}: ${noticia.titulo}`}
                  onClick={() => goToSlide(idx)}
                  className={`${styles.indicatorItem} ${isActive ? styles.indicatorActive : ""}`}
                >
                  {isActive && (
                    <span
                      key={animKey}
                      className={`${styles.indicatorProgressBar} ${
                        !isPaused && !userPaused && !selectedNoticia
                          ? styles.indicatorProgressBarAnimating
                          : styles.indicatorProgressBarPaused
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Status & Play/Pause controls */}
          <div className={styles.statusControls}>
            <div className={styles.counterBadge} aria-live="polite">
              <span className={styles.counterCurrent}>
                {String(currentIndex + 1).padStart(2, "0")}
              </span>
              <span> / </span>
              <span>{String(totalSlides).padStart(2, "0")}</span>
            </div>

            <button
              type="button"
              onClick={() => setUserPaused(!userPaused)}
              className={styles.pauseToggleBtn}
              aria-label={userPaused ? "Reanudar carrusel automático" : "Pausar carrusel automático"}
              title={userPaused ? "Reanudar" : "Pausar"}
            >
              {userPaused ? <Play size={14} /> : <Pause size={14} />}
            </button>
          </div>
        </div>
      </section>

      {/* Interactive News Detail Modal */}
      {selectedNoticia && (
        <ModalNoticia
          noticia={selectedNoticia}
          onClose={() => setSelectedNoticia(null)}
        />
      )}
    </>
  );
}
