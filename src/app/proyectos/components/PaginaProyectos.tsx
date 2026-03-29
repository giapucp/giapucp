import Figura from '@/components/comun/figura/Figura';
import ProyectoCard from './ProyectoCard';

const PaginaProyectos = () => {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">

        <ProyectoCard
          href="/proyectos/kuntur"
          titulo="Misión KUNTUR-1"
          badge="LASC 2025"
          descripcion="Primer cohete de sondeo experimental de la PUCP para la competencia Latin American Space Challenge 2025."
        >
          <Figura nombre="logo-kuntur" alt="Misión Kuntur" maxAncho="full" rounded={false} className="w-full h-full object-cover" />
        </ProyectoCard>

        <ProyectoCard
          href="/proyectos/misat"
          titulo="Misión MiSat"
          badge="PocketQube"
          badgeColor="bg-teal-50 text-teal-700 border-teal-200"
          descripcion="Nanosatélite PocketQube diseñado para el monitoreo ambiental de la Amazonía peruana."
        >
          <Figura nombre="logo-misat" alt="Misión MiSat" maxAncho="full" rounded={false} className="w-full h-full object-cover" />
        </ProyectoCard>

      </div>
    </div>
  );
};

export default PaginaProyectos;
