"use client"

import { useEffect, useState, useRef } from "react"
import Navbar from "@/components/comun/navbar/Navbar"
import MiembroCard from "./MiembroCard"
import { fetchMiembros } from "../api/Contentful"
import type { Miembro } from "../../types/types"
import "./PaginaEquipo.css"

import gsap from "gsap"
import Banner from "@/components/comun/banner/Banner"

const PaginaEquipo = () => {
  const [miembros, setMiembros] = useState<Miembro[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedArea, setSelectedArea] = useState("Todos")
  const [loading, setLoading] = useState(true)
  const [expandedAreas, setExpandedAreas] = useState<Record<string, boolean>>({})
  const pageContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const miembrosData = await fetchMiembros()
        setMiembros(miembrosData)
      } catch (error) {
        console.error("Error loading miembros:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (!pageContainerRef.current || miembros.length === 0 || loading) return

    // Solo animación inicial, sin ScrollTrigger
    const sections = gsap.utils.toArray<HTMLElement>(".directorio-seccion", pageContainerRef.current)
    
    // Animación escalonada al cargar
    gsap.fromTo(
      sections,
      { 
        opacity: 0, 
        y: 40 
      },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.15, 
        ease: "power3.out",
        delay: 0.3 
      }
    )
  }, [miembros, loading])

  // Resto del código se mantiene igual...
  const normalizeAreaName = (areaName: string): string => {
    return areaName.toLowerCase().trim()
  }

  const areaOptions = ["Todos", ...Array.from(new Set(miembros.map((m) => m.area.nombre)))]

  const miembrosFiltrados = miembros.filter((m) => {
    const matchNombre = `${m.nombres} ${m.apellidopaterno}`.toLowerCase().includes(searchTerm.toLowerCase())
    const matchArea = selectedArea === "Todos" || m.area.nombre === selectedArea
    return matchNombre && matchArea
  })

  const presidente = miembrosFiltrados.find((m) => normalizeAreaName(m.area.nombre) === "presidente")

  const areas = miembrosFiltrados
    .filter((m) => normalizeAreaName(m.area.nombre) !== "presidente")
    .reduce<Record<string, Miembro[]>>((acc, miembro) => {
      if (!acc[miembro.area.nombre]) {
        acc[miembro.area.nombre] = []
      }
      acc[miembro.area.nombre].push(miembro)
      return acc
    }, {})

  const toggleArea = (nombreArea: string) => {
    setExpandedAreas((prev) => ({
      ...prev,
      [nombreArea]: !prev[nombreArea],
    }))
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="pagina-directorio-container">
          <div className="loading-state">Cargando directorio...</div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="pagina-directorio-container" ref={pageContainerRef}>
  

        <div className="directorio-filtros">
          <select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)}>
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
                cargo={presidente.cargo}
              />
            </div>
          </section>
        )}

        {Object.entries(areas).map(([nombreArea, miembrosDelArea]) => (
          <section key={nombreArea} className="directorio-seccion">
            <div className="directorio-seccion-header" onClick={() => toggleArea(nombreArea)}>
              <h3>{nombreArea}</h3>
              <button
                className={`toggle-button ${expandedAreas[nombreArea] ? "expanded" : ""}`}
                aria-expanded={expandedAreas[nombreArea]}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M7 8l3 3 3-3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            {expandedAreas[nombreArea] && (
              <div className="miembros-grid">
                {miembrosDelArea.map((miembro) => (
                  <MiembroCard
                    key={miembro.id}
                    nombre={miembro.nombres}
                    apellido={miembro.apellidopaterno}
                    imagenSrc={miembro.foto}
                    cargo={miembro.cargo}
                  />
                ))}
              </div>
            )}
          </section>
        ))}

        {miembrosFiltrados.length === 0 && (
          <div className="no-results">No se encontraron miembros que coincidan con los filtros.</div>
        )}
      </div>
    </>
  )
}

export default PaginaEquipo
