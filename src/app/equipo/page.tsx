// app/equipo/page.tsx (NUEVO - Página del servidor)
import Navbar from "@/components/comun/navbar/Navbar";
import PaginaEquipo from "./components/PaginaEquipo";
import Banner from "@/components/comun/banner/Banner";

export default function EquipoPage() {
  return (
    <>
      <Navbar />
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