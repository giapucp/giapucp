"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowUp, Heart, ChevronRight } from "lucide-react";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const navLinks = [
    { label: "Inicio", href: "/" },
    { label: "Noticias", href: "/noticias" },
    { label: "Eventos", href: "/eventos" },
    { label: "Equipo", href: "/equipo" },
    { label: "Donar", href: "/donar" },
    { label: "Contacto", href: "/contacto" },
  ];

  return (
    <footer className={styles.footerWrapper}>
      {/* Resplandor ambiental de cielo estrellado / espacio profundo */}
      <div className={styles.ambientGlow} />

      {/* Línea divisoria superior estilo aeroespacial */}
      <div className={styles.topBorderGlow} />

      {/* Contenido principal del footer */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Columna 1: Identidad & Logos (GIA oficial + PUCP) */}
          <div className="lg:col-span-4 flex flex-col items-start space-y-6">
            <Link
              href="/"
              className="inline-block transition-transform duration-300 hover:scale-[1.02] focus:outline-none"
              aria-label="GIA PUCP — Página de Inicio"
            >
              <Image
                src="/logos/logo-gia-inversion.png"
                alt="Logo Oficial GIA PUCP"
                width={170}
                height={65}
                className={`w-[160px] sm:w-[175px] h-auto object-contain ${styles.logoGlow}`}
                priority={false}
              />
            </Link>

            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              Grupo de Investigación Aeroespacial de la Pontificia Universidad
              Católica del Perú. Impulsamos la investigación, ingeniería y
              tecnología espacial desde el Perú.
            </p>

            {/* Insignia institucional PUCP */}
            <div className="flex items-center gap-3.5 p-3">
              <Image
                src="/logos/logo-pucp.png"
                alt="Logo PUCP"
                width={38}
                height={38}
                className="w-9 h-9 object-contain filter brightness-0 invert opacity-90"
              />
              <div className="flex flex-col text-left">
                <span className="text-[11px] font-semibold tracking-wider text-white uppercase">
                  Pontificia Universidad Católica del Perú
                </span>
                <span className="text-[11px] text-slate-400">
                  Iniciativa Estudiantil Aeroespacial
                </span>
              </div>
            </div>
          </div>

          {/* Columna 2: Navegación rápida */}
          <div className="lg:col-span-2 sm:col-span-1 flex flex-col space-y-4">
            <h3 className="text-xs font-bold text-white tracking-widest uppercase flex items-center gap-2">
              Explorar
            </h3>
            <ul className={styles.navList}>
              {navLinks.map((link) => (
                <li key={link.href} className="list-none">
                  <Link href={link.href} className={styles.navLink}>
                    <ChevronRight size={13} className="text-slate-500 transition-transform group-hover:translate-x-0.5 shrink-0" />
                    <span>{link.label}</span>
                    <span className={styles.navLinkIndicator}></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Información de Contacto */}
          <div className="lg:col-span-3 sm:col-span-1 flex flex-col space-y-4">
            <h3 className="text-xs font-bold text-white tracking-widest uppercase flex items-center gap-2">
              Contacto
            </h3>
            <div className="space-y-3.5 pt-1">
              <a
                href="mailto:grupo.gia@pucp.edu.pe"
                className={styles.contactCard}
              >
                <div className={styles.contactIconBox}>
                  <Mail size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] text-slate-400 uppercase tracking-wide">
                    Correo electrónico
                  </span>
                  <span className="font-medium text-slate-200 hover:text-white transition-colors">
                    grupo.gia@pucp.edu.pe
                  </span>
                </div>
              </a>

              <a href="tel:+51963065928" className={styles.contactCard}>
                <div className={styles.contactIconBox}>
                  <Phone size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] text-slate-400 uppercase tracking-wide">
                    Teléfono
                  </span>
                  <span className="font-medium text-slate-200 hover:text-white transition-colors">
                    +51 963 065 928
                  </span>
                </div>
              </a>

              <div className={styles.contactCard}>
                <div className={styles.contactIconBox}>
                  <MapPin size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] text-slate-400 uppercase tracking-wide">
                    Ubicación
                  </span>
                  <span className="text-slate-200 text-xs leading-relaxed">
                    Campus PUCP — Av. Universitaria 1801, San Miguel
                  </span>
                  <span className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-400">
                    Lima, Perú
                    <span className="inline-flex items-center border border-white/20 rounded-xs overflow-hidden">
                      <span className="w-1.5 h-2.5 bg-red-600"></span>
                      <span className="w-1.5 h-2.5 bg-white"></span>
                      <span className="w-1.5 h-2.5 bg-red-600"></span>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Columna 4: Redes & Apoyo */}
          <div className="lg:col-span-3 flex flex-col space-y-4">
            <h3 className="text-xs font-bold text-white tracking-widest uppercase flex items-center gap-2">
              Comunidad
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed pt-1">
              Síguenos en nuestras redes sociales para estar al día de
              nuestros lanzamientos, eventos y talleres.
            </p>

            {/* Botones de Redes Sociales */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://www.instagram.com/gia_pucp/"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.socialBtn} ${styles.socialBtnInstagram}`}
                aria-label="Instagram GIA PUCP"
              >
                <FaInstagram size={20} className="text-[#E4405F]" />
              </a>

              <a
                href="https://www.linkedin.com/company/gia-at-pucp/"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.socialBtn} ${styles.socialBtnLinkedin}`}
                aria-label="LinkedIn GIA PUCP"
              >
                <FaLinkedinIn size={18} className="text-[#0077B5]" />
              </a>
            </div>

            {/* Mini tarjeta de Donar / Apoyar el proyecto */}
            <div className="mt-2 p-3.5 rounded-xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-3">
                <div className="text-xs">
                  <p className="font-semibold text-white">¿Deseas apoyarnos?</p>
                  <p className="text-[11px] text-slate-400">
                    Impulsa nuestros proyectos aeroespaciales.
                  </p>
                </div>
                <Link
                  href="/donar"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#1C296B] hover:bg-[#273a94] text-white transition-all shadow-md hover:shadow-indigo-500/25 shrink-0"
                >
                  <Heart size={12} className="text-red-400 fill-red-400" />
                  <span>Donar</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Separador inferior */}
        <div className="w-full h-px bg-white/10 mt-14 mb-8" />

        {/* Barra inferior: Derechos de autor, Lema espacial y Botón Volver arriba */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} GIA PUCP. Todos los derechos reservados.
          </p>

          <button
            onClick={scrollToTop}
            className={styles.backToTopBtn}
            aria-label="Volver al inicio de la página"
          >
            <span>Subir</span>
            <ArrowUp size={14} className="text-[var(--color-accent-light)]" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
