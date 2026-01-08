"use client";

import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/comun/navbar/Navbar";
import MiembroCard from "./MiembroCard";
import { fetchMiembros } from "../api/Contentful"; // Asegúrate de que la ruta sea correcta
import { Miembro } from "../../types/types";
import "./PaginaDirectorio.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PaginaDirectorio = () => {
  const [miembros, setMiembros] = useState<Miembro[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState("Todos");
  const [loading, setLoading] = useState(true);
  const pageContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const miembrosData = await fetchMiembros();
        setMiembros(miembrosData);
      } catch (error) {
        console.error("Error loading miembros:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!pageContainerRef.current || miembros.length === 0 || loading) return;

    const sections = gsap.utils.toArray<HTMLElement>(
      ".directorio-seccion",
      pageContainerRef.current,
    );
    const sectionTriggers: ScrollTrigger[] = [];

    sections.forEach((section) => {
      const tl = gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
          },
        },
      );
      sectionTriggers.push(tl.scrollTrigger!);
    });

    return () => {
      sectionTriggers.forEach((trigger) => trigger.kill());
    };
  }, [miembros, loading]);

  // Función para normalizar nombres de áreas (case insensitive)
  const normalizeAreaName = (areaName: string): string => {
    return areaName.toLowerCase().trim();
  };

  const areaOptions = [
    "Todos",
    ...Array.from(new Set(miembros.map((m) => m.area.nombre))),
  ];

  const miembrosFiltrados = miembros.filter((m) => {
    const matchNombre =
      `${m.nombres} ${m.apellidopaterno}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchArea =
      selectedArea === "Todos" || m.area.nombre === selectedArea;
    return matchNombre && matchArea;
  });

  // Buscar presidente (case insensitive)
  const presidente = miembrosFiltrados.find((m) => 
    normalizeAreaName(m.area.nombre) === "presidente"
  );

  // Agrupar por áreas (excluyendo presidente)
  const areas = miembrosFiltrados
    .filter((m) => normalizeAreaName(m.area.nombre) !== "presidente")
    .reduce<Record<string, Miembro[]>>((acc, miembro) => {
      if (!acc[miembro.area.nombre]) {
        acc[miembro.area.nombre] = [];
      }
      acc[miembro.area.nombre].push(miembro);
      return acc;
    }, {});

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="pagina-directorio-container">
          <div className="loading-state">Cargando directorio...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="pagina-directorio-container" ref={pageContainerRef}>
        <h2 className="directorio-titulo">Directorio</h2>

        <div className="directorio-filtros">
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
          >
            {areaOptions.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Buscar por nombre o apellido"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />					
        </div>

        {presidente && (
		<section className="directorio-seccion presidente-seccion">
			<h3>{presidente.area.nombre}</h3>
			<div className="miembros-grid">
			<MiembroCard
				key={presidente.id}
				nombre={presidente.nombres}
				apellido={presidente.apellidopaterno}
				imagenSrc={presidente.foto}
				cargo={presidente.cargo} // Pasa el objeto cargo completo
			/>
			</div>
		</section>
		)}

        {Object.entries(areas).map(([nombreArea, miembrosDelArea]) => (
		<section key={nombreArea} className="directorio-seccion">
			<h3>{nombreArea}</h3>
			<div className="miembros-grid">
			{miembrosDelArea.map((miembro) => (
				<MiembroCard
				key={miembro.id}
				nombre={miembro.nombres}
				apellido={miembro.apellidopaterno}
				imagenSrc={miembro.foto}
				cargo={miembro.cargo} // Pasa el objeto cargo completo
				/>
			))}
			</div>
		</section>
		))}

        {miembrosFiltrados.length === 0 && (
          <div className="no-results">
            No se encontraron miembros que coincidan con los filtros.
          </div>
        )}
      </div>
    </>
  );
};

export default PaginaDirectorio;