import type { Metadata } from "next";
import PaginaEquipo from "./components/PaginaEquipo";
import Banner from "@/components/comun/banner/Banner";

export const metadata: Metadata = {
  title: "Equipo",
  description:
    "Conoce a los estudiantes, docentes, ingenieros y directores del Grupo de Investigación Aeroespacial de la PUCP.",
  alternates: {
    canonical: "/equipo",
  },
};

export default function EquipoPage() {
  return (
    <>
      {/* Banner SERVER COMPONENT - Fuera del client component */}
      <Banner
        nombre="equipo"
        titulo="Conoce Nuestro Equipo"
        altura="lg"
      />
      {/* Client component con toda la lógica interactiva */}
      <PaginaEquipo />
    </>
  );
}