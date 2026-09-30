import HeroNoticiasCarousel from "./components/hero/HeroNoticiasCarousel";
import MisionVision from "./components/mision-vision/MisionVision";
import GIAEnBrasil from "./components/gia-en-brasil/GIAEnBrasil";
import SeccionEventos from "./components/eventos/SeccionEventos";
import HistoriaInicio from "./components/historia-inicio/HistoriaInicio";

export default function InicioPage() {
  return (
    <>
      <HeroNoticiasCarousel />
      <MisionVision />
      <GIAEnBrasil />
      <SeccionEventos />
      <HistoriaInicio />
    </>
  );
}
