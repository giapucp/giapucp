"use client";

import React, { useState, useEffect } from "react";
import mockDonaciones from "./realmockdata/donaciones.json";
import { Copy, Share2, MessageCircle } from "lucide-react";
import Image from "next/image";
import { copyToClipboard, sharePage as sharePageUtil, shareWhatsApp } from "./utils/clipboard";

export default function DonatePage() {

  const YAPE_PLIN_QR = "/qr_pagos/qr_yape_plin.jpg";
  const PLIN_NUMBER = "+51 923559154";
  const SCOTIABANK_ACCOUNT = "1430406387";
  const SCOTIABANK_CCI = "00907020143040638747";
  
  const [copied, setCopied] = useState<{ which: string; at: number | null }>({ which: "", at: null });

  // Limpiar estado de "copiado" después de 2 segundos
  useEffect(() => {
    if (copied.at) {
      const timer = setTimeout(() => {
        setCopied({ which: "", at: null });
      }, 2000);
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
      title: "Apoya nuestra causa",
      text: "Puedes hacer tu donación fácilmente por Yape o Plin",
      url: window.location.href
    };
    const shared = await sharePageUtil(shareData);
    if (!shared) {
      alert("Enlace copiado al portapapeles");
    }
  }

  function handleShareWhatsApp() {
    const text = "¡Hola! Te comparto esta página para hacer donaciones fácilmente por Plin:";
    shareWhatsApp(text, window.location.href);
  }

  const MAX_VISIBLE = 4;
  const ITEM_HEIGHT_PX = 64;
  const GAP_PX = 12;
  const needsScroll = mockDonaciones.length > MAX_VISIBLE;
  const muralStyle: React.CSSProperties = needsScroll
    ? { maxHeight: `${MAX_VISIBLE * ITEM_HEIGHT_PX + (MAX_VISIBLE - 1) * GAP_PX}px`, overflowY: "auto" }
    : {};

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-100 to-green-300 flex items-center justify-center p-4 pt-24">
      <div className="w-full max-w-6xl mx-auto flex items-start justify-between gap-6">
        <section className="w-full max-w-2xl bg-gradient-to-br from-green-50 to-green-200 rounded-3xl shadow-2xl overflow-hidden">
          {/* Header de la sección */}
          <div className="px-4 py-2 md:px-5 md:py-3 text-center border-b border-green-100">
              <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-green-700 mb-1 tracking-tight font-barlow-condensed">
              Construyamos este camino juntos
            </h1>
            <h2 className="text-lg md:text-xl text-green-800 font-medium">
              Sé parte de nuestra misión impulsando la ingeniería aeroespacial
            </h2>
          </div>

          {/* Tarjetas QR y Cuenta Bancaria*/}
          <div className="p-4 md:p-6 flex flex-col md:flex-row items-center justify-center gap-6">
                  {/* Tarjeta QR */}
                  <article className="w-full md:w-1/2 min-h-[410px] bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200 shadow-sm flex flex-col items-center justify-between">
                    <span className="text-green-700 font-bold text-lg md:text-xl mb-4">Yape/Plin</span>
                    <div className="w-64 h-64 md:w-50 md:h-50 rounded-xl overflow-hidden bg-white p-2 border-2 border-green-200 grid place-items-center shadow-sm mb-4">
                      <Image
                        src={YAPE_PLIN_QR}
                        alt="QR Yape/Plin"
                        width={200}
                        height={200}
                        unoptimized={true}
                      />
                    </div>
                    <button
                      onClick={() => copyNumber(PLIN_NUMBER, "plin")}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white border-2 border-green-200 hover:bg-green-50 transition-all duration-200 font-medium text-green-800 cursor-pointer"
                      type="button"
                    >
                      <Copy size={16} />
                      {copied.which === "plin" && copied.at ? "¡Copiado!" : "Copiar número"}
                    </button>
                  </article>
                  
                  {/* Tarjeta Cuenta Scotiabank */}
                  <article className="w-full md:w-1/2 min-h-[410px] bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200 shadow-sm flex flex-col items-center justify-between">
                    <span className="text-green-700 font-bold text-lg md:text-xl mb-4">Cuenta Scotiabank</span>
                    <div className="w-full max-w-xs rounded-xl bg-white p-4 border-2 border-green-200 shadow-sm mb-4 flex flex-col justify-center items-center">
                      <div className="flex flex-col items-center gap-4 w-full">
                        {/* Número de cuenta */}
                        <div className="text-center">
                          <span className="text-green-600 font-semibold text-sm block mb-1">Nº de Cuenta</span>
                          <span className="text-green-900 font-mono text-lg tracking-wider select-all">{SCOTIABANK_ACCOUNT}</span>
                        </div>
                        
                        {/* CCI */}
                        <div className="text-center">
                          <span className="text-green-600 font-semibold text-sm block mb-1">CCI</span>
                          <span className="text-green-900 font-mono text-sm tracking-wider select-all break-words">{SCOTIABANK_CCI}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Botones para copiar */}
                    <div className="w-full flex flex-col gap-2">
                      <button
                        onClick={() => copyNumber(SCOTIABANK_ACCOUNT, "cuenta")}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white border-2 border-green-200 hover:bg-green-50 transition-all duration-200 font-medium text-green-800 cursor-pointer text-sm"
                        type="button"
                      >
                        <Copy size={16} />
                        {copied.which === "cuenta" && copied.at ? "¡Copiado!" : "Copiar Nº Cuenta"}
                      </button>
                      
                      <button
                        onClick={() => copyNumber(SCOTIABANK_CCI, "cci")}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white border-2 border-green-200 hover:bg-green-50 transition-all duration-200 font-medium text-green-800 cursor-pointer text-sm"
                        type="button"
                      >
                        <Copy size={16} />
                        {copied.which === "cci" && copied.at ? "¡Copiado!" : "Copiar CCI"}
                      </button>
                    </div>
                  </article>
          </div>

          {/* Footer con opciones de compartir */}
          <div className="bg-gradient-to-br from-green-100 to-green-200 p-4 md:p-6 border-t border-green-100 mt-0">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-0">
              <button
                onClick={handleSharePage}
                className="w-full sm:w-48 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-medium transition-colors shadow-lg cursor-pointer"
                type="button"
              >
                <Share2 size={35} />
                Compartir página
              </button>

              <button
                onClick={handleShareWhatsApp}
                className="w-full sm:w-48 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-medium transition-colors shadow-lg cursor-pointer"
                type="button"
              >
                <MessageCircle size={35} />
                Compartir por WhatsApp
              </button>
            </div>
          </div>

        </section>

        {/* Right column: sponsors (above) and mural (below) */}
        <div className="w-full md:w-1/2 ml-6 flex flex-col gap-4">
          <section className="w-full bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200 shadow-sm">
            <div className="w-full flex items-center justify-between mb-3">
              <h3 className="text-green-800 font-bold text-4xl">Sponsors</h3>
              <div className="flex items-center">
                <img src="/sponsors/sponsor3.png" alt="KAME - EL" className="h-16 md:h-20 object-contain" loading="lazy" />
              </div>
            </div>

            <div className="w-full flex items-center justify-center gap-12 md:gap-16 py-2 mb-2">
              <div className="flex items-center justify-center px-2">
                <img src="/sponsors/sponsor2.png" alt="FACULTAD DE CIENCIAS E INGENIERIA PUCP" className="h-14 md:h-16 w-64 md:w-72 object-contain" loading="lazy" />
              </div>
              <div className="flex items-center justify-center px-2">
                <img src="/sponsors/sponsor1.png" alt="RADIOASTRONOMIA PUCP" className="h-14 md:h-16 w-64 md:w-72 object-contain" loading="lazy" />
              </div>
            </div>
          </section>

          <section className="w-full bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200 shadow-sm">
            <h3 className="text-green-800 text-center font-bold text-2xl mb-4">Mural de Donaciones</h3>
            <p className="text-sm text-green-700 mb-4">Últimas donaciones registradas</p>
            <div className="space-y-3 pr-2" style={muralStyle} aria-live="polite">
              {mockDonaciones.map((d: any, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-white p-3 rounded-lg border border-green-100 shadow-sm transform transition-all duration-150 hover:-translate-y-1 hover:shadow-md hover:bg-green-50"
                >
                  <div className="text-left">
                    <div className="font-semibold text-green-800">{d.nombre}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}