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

  return (
    <main className="w-full bg-gray-50 text-gray-900 min-h-screen py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">
        
        {/* PARTE SUPERIOR: Partners */}
        <section className="w-full rounded-3xl bg-white border border-gray-200 p-6 sm:p-8 shadow-xl">
          <h3 className="text-center font-bold text-3xl mb-8 text-gray-900">Nuestros Partners</h3>
          <div className="flex flex-wrap justify-center gap-6 lg:gap-10 items-center">
            <div className="w-40 sm:w-48 h-24 bg-gray-50 rounded-2xl flex items-center justify-center p-4 border border-gray-200 hover:border-[#00548c] transition-colors shadow-sm">
              <Image src="/sponsors/sponsor3.png" alt="KAME - EL" className="object-contain w-full h-full" width={400} height={400} />
            </div>
            <div className="w-40 sm:w-48 h-24 bg-gray-50 rounded-2xl flex items-center justify-center p-4 border border-gray-200 hover:border-[#00548c] transition-colors shadow-sm">
              <Image src="/sponsors/sponsor2.png" alt="FACULTAD DE CIENCIAS E INGENIERIA PUCP" className="object-contain w-full h-full" width={400} height={400} />
            </div>
            <div className="w-40 sm:w-48 h-24 bg-gray-50 rounded-2xl flex items-center justify-center p-4 border border-gray-200 hover:border-[#00548c] transition-colors shadow-sm">
              <Image src="/sponsors/sponsor1.png" alt="RADIOASTRONOMIA PUCP" className="object-contain w-full h-full" width={400} height={400} />
            </div>
            <div className="w-40 sm:w-48 h-24 bg-gray-50 rounded-2xl flex items-center justify-center p-4 border border-gray-200 hover:border-[#00548c] transition-colors shadow-sm">
              <Image src="/sponsors/sponsor4.png" alt="Enrique López Albújar" className="object-contain w-full h-full" width={400} height={400} />
            </div>
          </div>
        </section>

        {/* PARTE INFERIOR: 2 Columnas (Info de pago a la izquierda, Mural a la derecha) */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          
          {/* IZQUIERDA: Info de donación */}
          <section className="w-full lg:w-2/3 bg-white border border-gray-200 rounded-3xl shadow-xl overflow-hidden flex flex-col">
            <div className="px-6 py-6 sm:py-8 text-center border-b border-gray-200">
              <h1 className="text-3xl md:text-4xl font-black mb-3 text-gray-900">Construyamos este camino juntos</h1>
              <h2 className="text-gray-600 text-lg md:text-xl font-medium">Sé parte de nuestra misión impulsando la ingeniería aeroespacial</h2>
            </div>

            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 flex-grow">
              
              {/* Box Yape/Plin */}
              <article className="w-full md:w-1/2 rounded-2xl p-6 bg-gray-50 border border-gray-200 shadow-sm flex flex-col items-center justify-between gap-4">
                <span className="text-gray-900 font-bold text-xl uppercase tracking-wider">Yape / Plin</span>
                <div className="w-48 h-48 bg-white p-2 rounded-xl grid place-items-center shadow-sm border border-gray-100">
                  <Image src={YAPE_PLIN_QR} alt="QR Yape/Plin" width={200} height={200} unoptimized />
                </div>
                <button
                  onClick={() => copyNumber(PLIN_NUMBER, "plin")}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#00548c] hover:bg-[#0077cc] text-white font-semibold transition-all shadow-md"
                >
                  <Copy size={18} />
                  {copied.which === "plin" && copied.at ? "¡Copiado!" : "Copiar número"}
                </button>
              </article>

              {/* Box Banco */}
              <article className="w-full md:w-1/2 rounded-2xl p-6 bg-gray-50 border border-gray-200 shadow-sm flex flex-col items-center justify-between gap-4">
                <span className="text-gray-900 font-bold text-xl uppercase tracking-wider">Scotiabank</span>
                <div className="w-full bg-white p-4 rounded-xl border border-gray-200 flex flex-col gap-4 items-center justify-center flex-grow shadow-sm">
                  <div className="text-center w-full">
                    <span className="text-gray-500 text-sm font-semibold uppercase tracking-wider block mb-1">Cuenta Soles</span>
                    <span className="text-gray-900 font-mono text-lg tracking-wider break-all">{SCOTIABANK_ACCOUNT}</span>
                  </div>
                  <div className="w-full h-px bg-gray-200"></div>
                  <div className="text-center w-full">
                    <span className="text-gray-500 text-sm font-semibold uppercase tracking-wider block mb-1">CCI</span>
                    <span className="text-gray-900 font-mono text-lg tracking-wider break-all">{SCOTIABANK_CCI}</span>
                  </div>
                </div>
                
                <div className="w-full flex flex-col gap-2">
                  <button
                    onClick={() => copyNumber(SCOTIABANK_ACCOUNT, "cuenta")}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-medium transition-all text-sm shadow-sm"
                  >
                    <Copy size={16} />
                    {copied.which === "cuenta" && copied.at ? "¡Copiado!" : "Copiar Nº Cuenta"}
                  </button>
                  <button
                    onClick={() => copyNumber(SCOTIABANK_CCI, "cci")}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-medium transition-all text-sm shadow-sm"
                  >
                    <Copy size={16} />
                    {copied.which === "cci" && copied.at ? "¡Copiado!" : "Copiar CCI"}
                  </button>
                </div>
              </article>

            </div>

            <div className="bg-gray-50 p-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleSharePage}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-gray-100 border border-gray-300 shadow-sm text-gray-800 font-medium transition-colors"
                >
                  <Share2 size={20} />
                  Compartir página
                </button>
                <button
                  onClick={handleShareWhatsApp}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#1DA851] shadow-md text-white font-medium transition-colors"
                >
                  <MessageCircle size={20} />
                  WhatsApp
                </button>
              </div>
            </div>
          </section>

          {/* DERECHA: Mural */}
          <section className="w-full lg:w-1/3 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col">
            <h3 className="text-center font-bold text-2xl mb-6 text-gray-900 uppercase tracking-wide">Apadrina Tu Cohete</h3>
            <div className="flex-grow overflow-y-auto pr-2 space-y-3 custom-scrollbar" style={{ maxHeight: '600px' }}>
              {/* eslint-disable-next-line react/no-array-index-key, @typescript-eslint/no-explicit-any */}
              {mockDonaciones.map((d: any, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center justify-center text-center bg-gray-50 p-4 rounded-xl border border-gray-200 hover:border-[#00548c] transition-all duration-300"
                >
                  <div className="font-medium text-gray-800">{d.nombre}</div>
                </div>
              ))}
              {mockDonaciones.length === 0 && (
                <p className="text-gray-500 text-center py-10">Sé el primero en apadrinar.</p>
              )}
            </div>
          </section>

        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #00548c;
          border-radius: 10px;
        }
      `}</style>
    </main>
  );
}