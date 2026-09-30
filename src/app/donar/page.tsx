import type { Metadata } from "next";
import Donaciones from "./Donaciones";
import Banner from "@/components/comun/banner/Banner";

export const metadata: Metadata = {
  title: "Donaciones",
  description:
    "Apoya los proyectos de cohetería experimental y satélites del Grupo de Investigación Aeroespacial de la PUCP.",
  alternates: {
    canonical: "/donar",
  },
  openGraph: {
    title: "Donaciones | GIA PUCP",
    description:
      "Sé parte de nuestra misión impulsando la ingeniería y tecnología aeroespacial desde el Perú.",
    url: "https://www.giaperu.space/donar",
    images: [
      {
        url: "/logo.png",
        width: 600,
        height: 600,
        alt: "GIA PUCP - Donaciones",
      },
    ],
  },
};

export default function DonacionesPage() {
  return (
    <>
      <Banner nombre="donar" titulo="Donaciones" altura="lg" />
      <Donaciones />
    </>
  );
}

