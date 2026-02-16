import Donaciones from "./Donaciones";

import Banner from "@/components/comun/banner/Banner"

export default function DonacionesPage() {
  return (
    <>
      <Banner nombre="donar" titulo="Donaciones" altura="lg" />
      <Donaciones />
    </>
  )
}
