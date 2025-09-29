"use client";

import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/comun/navbar/Navbar";
import MiembroCard from "./MiembroCard";
import { fetchMiembros } from "../api/strapi";
import { Miembro } from "../types/types";
import "./PaginaDirectorio.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PaginaDirectorio = () => {
	const [miembros, setMiembros] = useState<Miembro[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedArea, setSelectedArea] = useState("Todos");
	const pageContainerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			const miembrosData = await fetchMiembros();
			setMiembros(miembrosData);
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (!pageContainerRef.current || miembros.length === 0) return;

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
	}, [miembros]);

	const areaOptions = [
		"Todos",
		...Array.from(new Set(miembros.map((m) => m.area.nombre))),
	];
	const miembrosFiltrados = miembros.filter((m) => {
		const matchNombre =
			`${m.nombre} ${m.apellidoPaterno}`
				.toLowerCase()
				.includes(searchTerm.toLowerCase());
		const matchArea =
			selectedArea === "Todos" || m.area.nombre === selectedArea;
		return matchNombre && matchArea;
	});

	const presidente = miembrosFiltrados.find(
		(m) => m.area.nombre === "presidente"
	);
	const areas = miembrosFiltrados
		.filter((m) => m.area.nombre !== "presidente")
		.reduce<Record<string, Miembro[]>>((acc, miembro) => {
			if (!acc[miembro.area.nombre]) {
				acc[miembro.area.nombre] = [];
			}
			acc[miembro.area.nombre].push(miembro);
			return acc;
		}, {});

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
								nombre={presidente.nombre}
								apellido={presidente.apellidoPaterno}
								imagenSrc={presidente.foto}
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
									nombre={miembro.nombre}
									apellido={miembro.apellidoPaterno}
									imagenSrc={miembro.foto}
								/>
							))}
						</div>
					</section>
				))}
			</div>
		</>
	);
};

export default PaginaDirectorio;
