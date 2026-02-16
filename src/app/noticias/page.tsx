import Navbar from "@/components/comun/navbar/Navbar";
import PaginaNoticias from "./components/PaginaNoticias";

import Banner from "@/components/comun/banner/Banner"

export default function Noticias() {
  return (
    <main>
      <Navbar />
      <Banner nombre="noticias" titulo="Noticias" altura="lg" />
      <PaginaNoticias />
    </main>
  );
}
