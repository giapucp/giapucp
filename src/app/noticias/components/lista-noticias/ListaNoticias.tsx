"use client";
import { useState, useEffect } from "react";
import type { Noticia, YearWithRows } from "../../types/types";
import { Newspaper } from "lucide-react";
import ModalNoticia from "../modal-noticia/ModalNoticia";
import { chunkArray } from "../../utils/arrayUtils";

import NewsContentDisplay from "./NewsContentDisplay";

import { fetchNoticias } from "../../api/strapi";
import "./ListaNoticias.css";

const ListaNoticias = () => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [noticiaSeleccionada, setNoticiaSeleccionada] = useState<Noticia | null>(null);
  const [yearsWithRows, setYearsWithRows] = useState<YearWithRows[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cantNoticias, setCantNoticias] = useState(0);

  useEffect(() => {
    const loadNoticias = async () => {
      try {
        setLoading(true);
        setError(null);

        const noticias = await fetchNoticias();

        // Verificar si hay datos
        if (!noticias || noticias.length === 0) {
          throw new Error("No se encontraron noticias");
        }
        setCantNoticias(noticias.length);
        // Agrupar por año
        const groupedByYear: Record<string, Noticia[]> = noticias.reduce((acc: Record<string, Noticia[]>, noticia: Noticia) => {
          try {
            const fecha = noticia.fechaPublicacion;
            if (!fecha) {
              console.warn("Noticia sin fecha:", noticia.id);
              return acc;
            }
            const year = new Date(fecha).getFullYear().toString();
            if (!acc[year]) acc[year] = [];
            acc[year].push(noticia);
            return acc;
          } catch (error) {
            console.error("Error procesando noticia:", noticia.id, error);
            return acc;
          }
        }, {});

        // Ordenar años y crear chunks
        const sortedYears: YearWithRows[] = Object.keys(groupedByYear)
          .sort((a, b) => Number(b) - Number(a))
          .map((year) => ({
            year,
            rows: chunkArray(groupedByYear[year], 2),
          }));

        setYearsWithRows(sortedYears);
      } catch (error) {
        console.error("Error cargando noticias:", error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Error desconocido");
        }
      } finally {
        setLoading(false);
      }
    };

    loadNoticias();
  }, []);

  const abrirModal = (noticia: Noticia) => {
    // Construir URL completa de la imagen si es necesario
    let portadaUrl = noticia.portada;
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL?.replace("/api", "") || "http://localhost:1337";
    if (portadaUrl && !portadaUrl.startsWith("http")) {
      portadaUrl = `${baseUrl}${portadaUrl}`;
    }

    setNoticiaSeleccionada({
      ...noticia,
      portada: portadaUrl || "/placeholder-noticia.jpg",
    });
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
            className="h-10 w-30 bg-blue-500 text-white font-medium bold rounded hover:bg-blue-600 transition"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (cantNoticias === 0) {
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
        <div className="container-noticias-titulo flex items-center gap-3 mb-8 md:mb-12">
          <Newspaper size={40} className="text-gray-800" />
          <h1 className="text-6xl font-bold text-gray-800">Noticias</h1>
        </div>
        <NewsContentDisplay
          yearsWithRows={yearsWithRows}
          abrirModal={abrirModal}
        />
        {modalAbierto && noticiaSeleccionada && (
          <ModalNoticia noticia={noticiaSeleccionada} onClose={cerrarModal} />
        )}
      </div>
    </div>
  );
};

export default ListaNoticias;
