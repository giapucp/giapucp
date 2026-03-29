'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface ProyectoCardProps {
  href: string;
  badge: string;
  badgeColor?: string;
  titulo: string;
  descripcion: string;
  children: ReactNode;
}

export default function ProyectoCard({
  href,
  badge,
  badgeColor = 'bg-blue-50 text-[#002366] border-blue-200',
  titulo,
  descripcion,
  children,
}: ProyectoCardProps) {
  return (
    <Link href={href} className="group block">
      <div className="relative aspect-square rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-1 bg-transparent">
        {/* Logo - siempre visible y ocupa todo el espacio */}
        <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 group-hover:scale-105">
          {children}
        </div>

        {/* Overlay oscuro - aparece en hover */}
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-6 text-center">
          <span className={`rounded-full ${badgeColor} px-3 py-1 text-[10px] font-bold tracking-wider uppercase border mb-3`}>
            {badge}
          </span>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-3">
            {titulo}
          </h3>
          <p className="text-white/90 text-sm font-primary leading-relaxed max-w-[90%] mb-6">
            {descripcion}
          </p>
          <div className="flex items-center font-semibold text-sm gap-1 text-white pb-1">
            <span>Ver proyecto</span>
            <svg className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
