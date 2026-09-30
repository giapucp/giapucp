import type { Metadata } from "next";
import Banner from "@/components/comun/banner/Banner";
import ListaEventos from "./components/ListaEventos";

export const metadata: Metadata = {
  title: "Eventos",
  description:
    "Descubre los talleres, charlas, lanzamientos y competencias aeroespaciales organizadas por GIA PUCP.",
  alternates: {
    canonical: "/eventos",
  },
};

export default function EventosPage() {
  return (
    <>
      <Banner nombre="eventos" titulo="Eventos" altura="lg" />
      <ListaEventos />
    </>
  );
}
