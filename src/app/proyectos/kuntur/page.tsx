import Navbar from "@/components/comun/navbar/Navbar";
import Banner from "@/components/comun/banner/Banner"
import MisionKuntur from './components/MisionKuntur';
const Kuntur = () => {
  return (
    <>
        <Navbar />
        <Banner nombre="kuntur" titulo="Kuntur" altura="lg" />
        <MisionKuntur></MisionKuntur>
    </>
  );
};

export default Kuntur;