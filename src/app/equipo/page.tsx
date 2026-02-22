
import Navbar from "@/components/comun/navbar/Navbar";
import PaginaEquipo from "./components/PaginaEquipo";
import Banner from "@/components/comun/banner/Banner";

export default function EquipoPage() {
  return (
    <>
      <Navbar />
      <Banner
        nombre="equipo"
        titulo="Conoce Nuestro Equipo"
        altura="xl"
      />
      <PaginaEquipo />
    </>
  );
}