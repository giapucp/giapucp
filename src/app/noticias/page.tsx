import type { Metadata } from "next";
import PaginaNoticias from "./components/PaginaNoticias";
import Banner from "@/components/comun/banner/Banner";

export const metadata: Metadata = {
  title: "Noticias",
  description:
    "Descubre los últimos avances, lanzamientos y noticias del Grupo de Investigación Aeroespacial de la PUCP.",
  alternates: {
    canonical: "/noticias",
  },
};

export default function Noticias() {
  return (
    <>
      <Banner nombre="noticias" titulo="Noticias" altura="lg" />
      <PaginaNoticias />
    </>
  );
}
