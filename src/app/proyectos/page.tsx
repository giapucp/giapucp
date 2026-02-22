import Navbar from "@/components/comun/navbar/Navbar";
import PaginaProyectos from "./components/PaginaProyectos";

import Banner from "@/components/comun/banner/Banner"

export default function Proyectos() {
  return (
    <main>
      <Navbar />
      <Banner nombre="proyectos" titulo="Proyectos" altura="xl" />
      <PaginaProyectos />
    </main>
  );
}
