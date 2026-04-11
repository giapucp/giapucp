import SeccionActualidad from "./components/actualidad/SeccionActualidad";
import SeccionEventos from "./components/eventos/SeccionEventos";
import MisionVision from "./components/mision-vision/MisionVision";
import GIAEnBrasil from "./components/gia-en-brasil/GIAEnBrasil";
import HistoriaInicio from "./components/historia-inicio/HistoriaInicio";

export default function InicioPage() {
  return (
    <main>
      <SeccionActualidad />
      <MisionVision />
      <GIAEnBrasil />
      <SeccionEventos />
      <HistoriaInicio />
    </main>
  );
}
