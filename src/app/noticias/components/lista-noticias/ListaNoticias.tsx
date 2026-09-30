"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import type { Noticia, YearWithRows } from "../../../types/types";
import ModalNoticia from "../modal-noticia/ModalNoticia";
import { chunkArray } from "../../utils/arrayUtils";
import { normalizeText, extractPlainText } from "../../utils/textUtils";
import NewsContentDisplay from "./NewsContentDisplay";
import FiltrosNoticias from "./FiltrosNoticias";
import { fetchNoticias } from "../../api/ContentfulNoticias";
import "./ListaNoticias.css";

const ListaNoticias = () => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [noticiaSeleccionada, setNoticiaSeleccionada] = useState<Noticia | null>(null);
  const [todasLasNoticias, setTodasLasNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados de filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("todos");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  useEffect(() => {
    const loadNoticias = async () => {
      try {
        setLoading(true);
        setError(null);

        const noticias = await fetchNoticias();

        if (!noticias || noticias.length === 0) {
          throw new Error("No se encontraron noticias");
        }

        setTodasLasNoticias(noticias);
      } catch (err) {
        console.error("Error cargando noticias:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error desconocido");
        }
      } finally {
        setLoading(false);
      }
    };

    loadNoticias();
  }, []);

  // Lista de años disponibles extraídos dinámicamente de las noticias cargadas
  const availableYears = useMemo(() => {
    const yearsSet = new Set<string>();
    todasLasNoticias.forEach((noticia) => {
      if (noticia.fechaPublicacion) {
        try {
          const year = new Date(noticia.fechaPublicacion).getFullYear().toString();
          if (!isNaN(Number(year))) {
            yearsSet.add(year);
          }
        } catch {
          // Ignorar fechas inválidas
        }
      }
    });
    return Array.from(yearsSet).sort((a, b) => Number(b) - Number(a));
  }, [todasLasNoticias]);

  // Filtrado y ordenamiento de noticias
  const noticiasFiltradas = useMemo(() => {
    const query = normalizeText(searchTerm.trim());

    return todasLasNoticias
      .filter((noticia) => {
        // Filtro por año
        if (selectedYear !== "todos") {
          try {
            const itemYear = new Date(noticia.fechaPublicacion).getFullYear().toString();
            if (itemYear !== selectedYear) return false;
          } catch {
            return false;
          }
        }

        // Filtro por búsqueda (título, subtítulo y contenido de texto plano)
        if (query) {
          const tituloNorm = normalizeText(noticia.titulo || "");
          const subtituloNorm = normalizeText(noticia.subtitulo || "");
          const contenidoNorm = normalizeText(extractPlainText(noticia.contenido));

          const coincide =
            tituloNorm.includes(query) ||
            subtituloNorm.includes(query) ||
            contenidoNorm.includes(query);

          if (!coincide) return false;
        }

        return true;
      })
      .sort((a, b) => {
        const timeA = new Date(a.fechaPublicacion || 0).getTime();
        const timeB = new Date(b.fechaPublicacion || 0).getTime();
        return sortOrder === "desc" ? timeB - timeA : timeA - timeB;
      });
  }, [todasLasNoticias, searchTerm, selectedYear, sortOrder]);

  // Agrupamiento por año y filas para visualización
  const yearsWithRows: YearWithRows[] = useMemo(() => {
    const groupedByYear: Record<string, Noticia[]> = {};

    noticiasFiltradas.forEach((noticia) => {
      try {
        const year = new Date(noticia.fechaPublicacion).getFullYear().toString();
        if (!groupedByYear[year]) {
          groupedByYear[year] = [];
        }
        groupedByYear[year].push(noticia);
      } catch {
        const year = "Otros";
        if (!groupedByYear[year]) groupedByYear[year] = [];
        groupedByYear[year].push(noticia);
      }
    });

    const sortedYearKeys = Object.keys(groupedByYear).sort((a, b) => {
      const numA = Number(a);
      const numB = Number(b);
      if (isNaN(numA)) return 1;
      if (isNaN(numB)) return -1;
      return sortOrder === "desc" ? numB - numA : numA - numB;
    });

    return sortedYearKeys.map((year) => ({
      year,
      rows: chunkArray(groupedByYear[year], 4),
    }));
  }, [noticiasFiltradas, sortOrder]);

  const hasActiveFilters = useMemo(() => {
    return searchTerm.trim() !== "" || selectedYear !== "todos" || sortOrder !== "desc";
  }, [searchTerm, selectedYear, sortOrder]);

  const handleResetFiltros = useCallback(() => {
    setSearchTerm("");
    setSelectedYear("todos");
    setSortOrder("desc");
  }, []);

  const abrirModal = (noticia: Noticia) => {
    setNoticiaSeleccionada(noticia);
    setModalAbierto(true);
    document.body.style.overflow = "hidden";
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    document.body.style.overflow = "auto";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh] py-8 px-4">
        <div className="text-center">
          <div className="inline-block relative w-20 h-20">
            <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-3 border-4 border-blue-300 border-b-transparent rounded-full animate-spin animation-delay-200"></div>
          </div>
          <p className="mt-4 text-xl font-medium text-gray-700 animate-pulse">
            Cargando noticias...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[50vh] py-8 px-4">
        <div className="text-center">
          <p className="text-xl font-medium text-red-600 mb-4">
            Error al cargar las noticias
          </p>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="h-10 px-6 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (todasLasNoticias.length === 0) {
    return (
      <div className="flex justify-center items-center h-[50vh] py-8 px-4">
        <div className="text-center">
          <p className="text-xl font-medium text-gray-700">
            No hay noticias disponibles
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-noticias-wrapper w-full">
      <div className="container-noticias-wrapper-contenido max-w-[1200px] mx-auto sm:px-6 md:py-16 mt-8 md:mt-20">
        {/* Barra de Filtros */}
        <FiltrosNoticias
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
          availableYears={availableYears}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          totalResultados={noticiasFiltradas.length}
          totalOriginal={todasLasNoticias.length}
          hasActiveFilters={hasActiveFilters}
          onResetFiltros={handleResetFiltros}
        />

        {/* Contenido: Si no hay resultados con los filtros actuales */}
        {noticiasFiltradas.length === 0 ? (
          <div className="noticias-empty-state">
            <div className="noticias-empty-icon-wrapper">
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </div>
            <h3 className="noticias-empty-title">No se encontraron noticias</h3>
            <p className="noticias-empty-description">
              No encontramos publicaciones que coincidan con tus criterios de búsqueda. Intenta con otros términos o restablece los filtros.
            </p>
            <button
              type="button"
              className="noticias-empty-btn"
              onClick={handleResetFiltros}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              <span>Restablecer filtros</span>
            </button>
          </div>
        ) : (
          <NewsContentDisplay
            yearsWithRows={yearsWithRows}
            abrirModal={abrirModal}
          />
        )}

        {modalAbierto && noticiaSeleccionada && (
          <ModalNoticia noticia={noticiaSeleccionada} onClose={cerrarModal} />
        )}
      </div>
    </div>
  );
};

export default ListaNoticias;