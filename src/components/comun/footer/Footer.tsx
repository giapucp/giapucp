"use client";


import React, { useEffect, useRef } from "react";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Image from "next/image";

const Footer: React.FC = () => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 1;
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${progress * 100}%`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    // Llamar una vez para inicializar
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="principal-footer-container bg-black text-[#e3e3db] py-20 px-5 md:px-10 flex flex-col items-center w-full box-border min-h-[50vh]"
      ref={footerRef}
    >
      {/* Barra divisora con efecto de llenado */}
      <div className="progress-bar-container w-[90%] h-[3px] bg-[#333] relative overflow-hidden my-16">
        <div
          className="progress-bar absolute top-0 left-0 h-full w-0"
          ref={progressBarRef}
          style={{
            background: "linear-gradient(90deg, #00f2fe 0%, #4facfe 100%)",
          }}
        ></div>
      </div>
      <div className="footer-content flex flex-col items-center w-full max-w-screen-xl px-4 md:px-0">
        <div className="flex flex-col md:flex-row justify-center md:gap-x-10 w-full">
          {/* COLUMNA 1: GIA + Logo PUCP */}
          <div className="footer-col flex flex-col items-center mb-12 md:mb-0 flex-1 min-w-[220px]">
            <p className="text-4xl font-bold text-white font-barlow-condensed leading-none mb-8">
              GIA
            </p>
            <Image
              src="/logos/logo-pucp.png"
              alt="PUCP Logo"
              className="w-[150px] h-auto filter brightness-0 invert"
              loading="lazy"
              width={150}
              height={150}
            />
          </div>
          {/* COLUMNA 2: Contacto + Detalles */}
          <div className="footer-col flex flex-col items-center mb-12 md:mb-0 flex-1 min-w-[220px]">
            <h3 className="text-xl md:text-2xl font-bold text-white font-barlow-condensed mb-8">
              Contacto
            </h3>
            <p className="text-base md:text-lg leading-relaxed mb-2 font-barlow-condensed">
              grupo.gia@pucp.edu.pe
            </p>
            <p className="text-base md:text-lg leading-relaxed mb-2 font-barlow-condensed">
              +51 972285288
            </p>
            <p className="text-base md:text-lg leading-relaxed flex items-center justify-center gap-2 font-barlow-condensed">
              Perú
              <span className="flex items-center gap-px">
                <span className="w-2 h-4 bg-red-600"></span>
                <span className="w-2 h-4 bg-white"></span>
                <span className="w-2 h-4 bg-red-600"></span>
              </span>
            </p>
          </div>
          {/* COLUMNA 3: Redes + Iconos */}
          <div className="footer-col flex flex-col items-center flex-1 min-w-[220px]">
            <h3 className="text-xl md:text-2xl font-bold text-white font-barlow-condensed mb-8">
              Redes
            </h3>
            <div className="social-icons flex gap-6 justify-center mt-2">
              <a
                href="https://www.instagram.com/gia_pucp/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-300 hover:-translate-y-1"
              >
                <FaInstagram size={35} style={{ color: "#E4405F" }} />
              </a>
              <a
                href="https://www.linkedin.com/company/gia-at-pucp/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-300 hover:-translate-y-1"
              >
                <FaLinkedinIn size={35} style={{ color: "#0077B5" }} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom mt-20 text-center w-full text-sm text-[#a0a0a0] font-barlow-condensed">
        <p>©2025 Reservado todos los derechos</p>
      </div>
    </div>
  );
};

export default Footer;
