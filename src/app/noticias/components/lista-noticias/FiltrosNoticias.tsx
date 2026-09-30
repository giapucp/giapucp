"use client";

import React from "react";
import "./FiltrosNoticias.css";

interface FiltrosNoticiasProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedYear: string;
  onYearChange: (year: string) => void;
  availableYears: string[];
  sortOrder: "desc" | "asc";
  onSortChange: (order: "desc" | "asc") => void;
  totalResultados: number;
  totalOriginal: number;
  hasActiveFilters: boolean;
  onResetFiltros: () => void;
}

const FiltrosNoticias: React.FC<FiltrosNoticiasProps> = ({
  searchTerm,
  onSearchChange,
  selectedYear,
  onYearChange,
  availableYears,
  sortOrder,
  onSortChange,
  totalResultados,
  totalOriginal,
  hasActiveFilters,
  onResetFiltros,
}) => {
  return (
    <div className="filtros-noticias-wrapper" role="search" aria-label="Filtros de noticias">
      <div className="filtros-noticias-card">
        {/* Barra superior: Búsqueda y Ordenamiento */}
        <div className="filtros-top-row">
          <div className="filtros-search-container">
            <svg
              className="filtros-search-icon"
              width="20"
              height="20"
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
            </svg>
            <input
              type="text"
              className="filtros-search-input"
              placeholder="Buscar noticias por título o contenido..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Buscar noticias por título o contenido"
            />
            {searchTerm && (
              <button
                type="button"
                className="filtros-search-clear"
                onClick={() => onSearchChange("")}
                aria-label="Limpiar búsqueda"
                title="Limpiar búsqueda"
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
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>

          <div className="filtros-sort-container">
            <label htmlFor="sort-select" className="filtros-sort-label">
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
                <path d="M3 6h18" />
                <path d="M7 12h10" />
                <path d="M10 18h4" />
              </svg>
              <span className="filtros-sort-text">Ordenar:</span>
            </label>
            <div className="filtros-select-wrapper">
              <select
                id="sort-select"
                className="filtros-sort-select"
                value={sortOrder}
                onChange={(e) => onSortChange(e.target.value as "desc" | "asc")}
                aria-label="Ordenar noticias"
              >
                <option value="desc">Más recientes primero</option>
                <option value="asc">Más antiguas primero</option>
              </select>
              <svg
                className="filtros-select-chevron"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </div>

        {/* Barra de Filtro de Años (Pills) */}
        {availableYears.length > 0 && (
          <div className="filtros-years-row">
            <div className="filtros-years-label">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>Año:</span>
            </div>
            <div className="filtros-years-pills" role="radiogroup" aria-label="Filtrar por año">
              <button
                type="button"
                className={`filtros-year-pill ${selectedYear === "todos" ? "active" : ""}`}
                onClick={() => onYearChange("todos")}
                role="radio"
                aria-checked={selectedYear === "todos"}
              >
                Todos los años
              </button>
              {availableYears.map((year) => (
                <button
                  key={year}
                  type="button"
                  className={`filtros-year-pill ${selectedYear === year ? "active" : ""}`}
                  onClick={() => onYearChange(year)}
                  role="radio"
                  aria-checked={selectedYear === year}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Barra de Estado y Resumen */}
        <div className="filtros-status-row">
          <div className="filtros-results-count">
            <span className="filtros-count-number">{totalResultados}</span>
            <span className="filtros-count-label">
              {totalResultados === 1 ? "noticia encontrada" : "noticias encontradas"}
            </span>
            {hasActiveFilters && totalOriginal > 0 && (
              <span className="filtros-total-ref"> (de {totalOriginal} en total)</span>
            )}
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              className="filtros-reset-btn"
              onClick={onResetFiltros}
              title="Restablecer todos los filtros"
            >
              <svg
                width="14"
                height="14"
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
              <span>Limpiar filtros</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FiltrosNoticias;
