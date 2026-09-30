"use client";

import React, { useState, useEffect } from "react";
import mockDonaciones from "./realmockdata/donaciones.json";
import { useDonaciones } from "./hooks/useDonaciones";
import {
  Copy,
  Check,
  Share2,
  MessageCircle,
  Rocket,
  Building2,
  Sparkles,
  Smartphone,
  CreditCard,
  Heart,
  Users,
} from "lucide-react";
import Image from "next/image";
import { copyToClipboard, sharePage as sharePageUtil, shareWhatsApp } from "./utils/clipboard";

interface Partner {
  name: string;
  logo: string;
  description: string;
  isSvg?: boolean;
}

const PARTNERS: Partner[] = [
  {
    name: "LG",
    logo: "/sponsors/lg.svg",
    description: "Tecnología & Innovación",
    isSvg: true,
  },
  {
    name: "Open3D",
    logo: "/sponsors/open3d.png",
    description: "Manufactura Aditiva & Prototipado",
  },
  {
    name: "Facultad de Ciencias e Ingeniería PUCP",
    logo: "/sponsors/sponsor2.png",
    description: "Respaldo Académico PUCP",
  },
  {
    name: "Radioastronomía PUCP",
    logo: "/sponsors/sponsor1.png",
    description: "Investigación Científica",
  },
  {
    name: "KAME - EL",
    logo: "/sponsors/sponsor3.png",
    description: "Aliado Tecnológico",
  },
  {
    name: "Enrique López Albújar",
    logo: "/sponsors/sponsor4.png",
    description: "Institución Aliada",
  },
];

export default function DonatePage() {
  const YAPE_PLIN_QR = "/qr_pagos/qr_yape_plin.jpg";
  const PLIN_NUMBER = "+51 923559154";
  const SCOTIABANK_ACCOUNT = "1430406387";
  const SCOTIABANK_CCI = "00907020143040638747";

  const { data: donacionesLive, isLoading: isLoadingDonaciones } = useDonaciones();
  const donaciones = donacionesLive && donacionesLive.length > 0 ? donacionesLive : mockDonaciones;

  const [copied, setCopied] = useState<{ which: string; at: number | null }>({ which: "", at: null });

  // Limpiar estado de "copiado" después de 2.2 segundos
  useEffect(() => {
    if (copied.at) {
      const timer = setTimeout(() => {
        setCopied({ which: "", at: null });
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [copied.at]);

  async function copyNumber(text: string, which: string) {
    const success = await copyToClipboard(text);
    if (success) {
      setCopied({ which, at: Date.now() });
    }
  }

  async function handleSharePage() {
    const shareData = {
      title: "Apoya al Grupo de Investigación Aeroespacial - GIA PUCP",
      text: "Únete y apoya los proyectos de cohetería experimental y tecnología satelital de GIA PUCP.",
      url: window.location.href,
    };
    const shared = await sharePageUtil(shareData);
    if (!shared) {
      copyNumber(window.location.href, "share-link");
    }
  }

  function handleShareWhatsApp() {
    const text =
      "¡Hola! Te comparto la página de donaciones de GIA PUCP para apoyar sus proyectos de cohetería experimental y satélites:";
    shareWhatsApp(text, window.location.href);
  }

  return (
    <div className="w-full bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-800 min-h-screen py-10 sm:py-14 px-4 sm:px-6 lg:px-8 flex flex-col items-center font-primary relative overflow-hidden">
      {/* Sutiles elementos de resplandor espacial de fondo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#CEDCF7]/25 via-transparent to-transparent pointer-events-none -z-10 blur-3xl" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-[#1C296B]/5 rounded-full pointer-events-none -z-10 blur-3xl" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-[#030723]/5 rounded-full pointer-events-none -z-10 blur-3xl" />

      <div className="w-full max-w-6xl mx-auto flex flex-col gap-10">

        {/* PARTE SUPERIOR: Partners */}
        <section className="w-full rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/80 p-6 sm:p-10 shadow-xl shadow-slate-200/60 relative overflow-hidden">
          {/* Acento superior decorativo con la identidad GIA */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#030723] via-[#1C296B] to-[#CEDCF7]" />

          <div className="flex flex-col items-center text-center mb-2 sm:mb-3">
            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-slate-900 tracking-tight">
              Nuestros Partners
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mt-2 font-normal">
              Empresas, facultades e instituciones que impulsan el desarrollo de la investigación aeroespacial peruana junto a GIA PUCP.
            </p>
          </div>

          {/* Grid de Partners de 6 columnas simétrico */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {PARTNERS.map((partner) => (
              <div
                key={partner.name}
                className="group relative flex flex-col items-center justify-between p-4 h-32"
                title={`${partner.name} - ${partner.description}`}
              >
                <div className="relative w-full flex-1 flex items-center justify-center p-2">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={partner.isSvg ? 180 : 160}
                    height={80}
                    unoptimized={partner.isSvg}
                    className="max-h-16 w-auto object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PARTE INFERIOR: 2 Columnas (Info de pago a la izquierda, Mural a la derecha) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* IZQUIERDA: Info de donación (8 columnas) */}
          <section className="w-full lg:col-span-8 bg-white/95 backdrop-blur-sm border border-slate-200/80 rounded-3xl shadow-xl shadow-slate-200/60 overflow-hidden flex flex-col">
            {/* Header de la sección */}
            <div className="px-6 py-8 sm:px-10 sm:py-10 text-center border-b border-slate-100 bg-gradient-to-b from-slate-50/70 to-white relative">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-slate-900 tracking-tight mb-2">
                Construyamos este camino juntos
              </h1>
              <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto font-normal">
                Sé parte de nuestra misión impulsando la ingeniería y el talento aeroespacial desde el Perú. Cada aporte impulsa el desarrollo de nuevos lanzamientos y prototipos.
              </p>
            </div>

            <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-6">

              {/* Box Yape/Plin */}
              <article className="w-full md:w-1/2 rounded-2xl p-6 bg-slate-50/90 border border-slate-200/90 hover:border-[#1C296B]/50 transition-colors flex flex-col items-center justify-between gap-5 relative group">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <Smartphone size={18} className="text-[#1C296B]" />
                    <span className="text-slate-900 font-display font-bold text-lg tracking-wide">
                      Billeteras Móviles
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#742384] text-white">
                      Yape
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#00A896] text-white">
                      Plin
                    </span>
                  </div>
                </div>

                {/* Contenedor QR con borde estilo visor */}
                <div className="w-52 h-52 bg-white p-3 rounded-2xl grid place-items-center shadow-md border border-slate-200/80 relative">
                  <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#1C296B] rounded-tl-md" />
                  <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#1C296B] rounded-tr-md" />
                  <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#1C296B] rounded-bl-md" />
                  <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#1C296B] rounded-br-md" />
                  <Image
                    src={YAPE_PLIN_QR}
                    alt="QR Yape y Plin para donaciones GIA PUCP"
                    width={200}
                    height={200}
                    unoptimized
                    className="rounded-xl object-contain"
                  />
                </div>

                <div className="w-full text-center">
                  <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold block mb-1">
                    Número asignado
                  </span>
                  <p className="text-slate-900 font-mono text-base font-bold tracking-wider">
                    {PLIN_NUMBER}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => copyNumber(PLIN_NUMBER, "plin")}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#1C296B] hover:bg-[#151F54] active:scale-[0.98] text-white font-medium transition-all shadow-md shadow-[#1C296B]/20 cursor-pointer"
                >
                  {copied.which === "plin" && copied.at ? (
                    <>
                      <Check size={18} className="text-emerald-300 animate-pulse" />
                      <span className="text-emerald-100 font-semibold">¡Número copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={18} />
                      <span>Copiar número</span>
                    </>
                  )}
                </button>
              </article>

              {/* Box Banco */}
              <article className="w-full md:w-1/2 rounded-2xl p-6 bg-slate-50/90 border border-slate-200/90 hover:border-[#1C296B]/50 transition-colors flex flex-col items-center justify-between gap-5 relative">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <CreditCard size={18} className="text-[#1C296B]" />
                    <span className="text-slate-900 font-display font-bold text-lg tracking-wide">
                      Scotiabank
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EC111A] text-white">
                    Soles (PEN)
                  </span>
                </div>

                <div className="w-full bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 flex flex-col gap-4 shadow-sm flex-grow justify-center">
                  <div className="text-left w-full">
                    <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider block mb-1">
                      Cuenta Corriente Soles
                    </span>
                    <span className="text-slate-900 font-mono text-base sm:text-lg font-bold tracking-wider break-all select-all block">
                      {SCOTIABANK_ACCOUNT}
                    </span>
                  </div>
                  <div className="w-full h-px bg-slate-100" />
                  <div className="text-left w-full">
                    <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider block mb-1">
                      Código Interbancario (CCI)
                    </span>
                    <span className="text-slate-900 font-mono text-sm sm:text-base font-bold tracking-wider break-all select-all block">
                      {SCOTIABANK_CCI}
                    </span>
                  </div>
                </div>

                <div className="w-full flex flex-col sm:flex-row md:flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() => copyNumber(SCOTIABANK_ACCOUNT, "cuenta")}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:border-[#1C296B] hover:bg-slate-50 text-slate-800 font-medium transition-all text-sm shadow-sm cursor-pointer"
                  >
                    {copied.which === "cuenta" && copied.at ? (
                      <>
                        <Check size={16} className="text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">¡Cuenta copiada!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={16} className="text-slate-500" />
                        <span>Copiar Nº Cuenta</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => copyNumber(SCOTIABANK_CCI, "cci")}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:border-[#1C296B] hover:bg-slate-50 text-slate-800 font-medium transition-all text-sm shadow-sm cursor-pointer"
                  >
                    {copied.which === "cci" && copied.at ? (
                      <>
                        <Check size={16} className="text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">¡CCI copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={16} className="text-slate-500" />
                        <span>Copiar CCI</span>
                      </>
                    )}
                  </button>
                </div>
              </article>

            </div>

            {/* Acciones de difusión */}
            <div className="bg-slate-50/90 p-5 sm:p-6 border-t border-slate-200/80">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <button
                  type="button"
                  onClick={handleSharePage}
                  className="w-full sm:flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-medium transition-colors shadow-sm cursor-pointer"
                >
                  {copied.which === "share-link" && copied.at ? (
                    <>
                      <Check size={18} className="text-emerald-600" />
                      <span className="text-emerald-700">¡Enlace copiado!</span>
                    </>
                  ) : (
                    <>
                      <Share2 size={18} className="text-slate-600" />
                      <span>Compartir página</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="w-full sm:flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-medium transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
                >
                  <MessageCircle size={18} />
                  <span>Difundir por WhatsApp</span>
                </button>
              </div>
            </div>
          </section>

          {/* DERECHA: Mural de Honor / Padrinos (4 columnas) */}
          <section className="w-full lg:col-span-4 bg-white/95 backdrop-blur-sm border border-slate-200/80 rounded-3xl p-6 sm:p-7 shadow-xl shadow-slate-200/60 flex flex-col h-full">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900 tracking-tight leading-tight">
                    Apadrina Tu Cohete 2025
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">Mural de donantes</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                <Users size={12} />
                <span>{donaciones.length}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 mb-4 font-normal">
              Agradecimiento especial a todas las personas que suman su apoyo para impulsar nuestras metas aeroespaciales:
            </p>

            <div
              className="flex-grow overflow-y-auto pr-2 space-y-2.5 custom-scrollbar"
              style={{ maxHeight: "610px" }}
            >
              {isLoadingDonaciones && (
                <div className="flex flex-col justify-center items-center py-12 gap-3">
                  <div className="w-7 h-7 border-2 border-[#1C296B] border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs text-slate-400 font-medium">Cargando mural...</span>
                </div>
              )}
              {donaciones.map((d, idx) => (
                <div
                  key={`${d.nombre}-${idx}`}
                  className="flex items-center gap-3 bg-slate-50 hover:bg-slate-100/80 p-3 rounded-xl border border-slate-200/70 hover:border-[#1C296B]/40 transition-all duration-200 group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-slate-800 text-sm truncate">
                      {d.nombre}
                    </div>
                  </div>
                </div>
              ))}
              {!isLoadingDonaciones && donaciones.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Heart size={28} className="text-slate-300 mb-2" />
                  <p className="text-slate-500 text-sm font-medium">Sé el primero en apadrinar.</p>
                  <p className="text-slate-400 text-xs mt-1">Tu nombre aparecerá aquí en nuestro mural de honor.</p>
                </div>
              )}
            </div>
          </section>

        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1c296b;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #0f173f;
        }
      `}</style>
    </div>
  );
}