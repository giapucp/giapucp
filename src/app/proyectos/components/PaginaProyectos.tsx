import Link from 'next/link';
import "./PaginaProyectos.css";

const PaginaProyectos = () => {
  return (
    <>
    <Link href={'/proyectos/kuntur'}>
      <button className='link-proyecto'>
          Proyecto kuntur
      </button>
    </Link>
    

      {/* Banner para MiSat*/}
    </>
  );
};

export default PaginaProyectos;
