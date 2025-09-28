import SeccionActualidad from "./components/actualidad/SeccionActualidad";
import MisionVision from "./components/mision-vision/MisionVision";
import RumboBrasil from "./components/rumbo-brasil/RumboBrasil";
import HistoriaInicio from "./components/historia-inicio/HistoriaInicio";

export default function InicioPage() {
  return (
    <main>
      <SeccionActualidad />
      <MisionVision />
      <RumboBrasil />
      <HistoriaInicio />
    </main>
  );
}
