import type { Metadata } from "next";
import PaginaContacto from "./components/PaginaContacto";
import Banner from "@/components/comun/banner/Banner";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Ponte en contacto con el Grupo de Investigación Aeroespacial de la PUCP para alianzas, colaboraciones o consultas generales.",
  alternates: {
    canonical: "/contacto",
  },
};

export default function Contacto() {
  return (
    <>
      <Banner nombre="contacto" titulo="Contáctanos" altura="lg" />
      <PaginaContacto />
    </>
  )
}
