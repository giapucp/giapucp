import Navbar from "@/components/comun/navbar/Navbar";
import Banner from "@/components/comun/banner/Banner";
import ListaEventos from "./components/ListaEventos";

export default function EventosPage() {
  return (
    <main>
      <Navbar />
      <Banner nombre="eventos" titulo="Eventos" altura="lg" />
      <ListaEventos />
    </main>
  );
}
