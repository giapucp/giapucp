"use client";
import ListaNoticias from "./lista-noticias/ListaNoticias";
import "./PaginaNoticias.css";

import Banner from "@/components/comun/banner/Banner"

const PaginaNoticias = () => {
  return (
    <div>
      <Banner nombre="noticias" titulo="Noticias" altura="lg" />
      <div className="container-noticias">
        <ListaNoticias />
      </div>
    </div>
  );
};

export default PaginaNoticias;
