"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";

import "./Navbar.css";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const LOGO_GIA = "/logos/logo-gia-inversion.png";

  return (
    <>
      <header className="navbar-simple fixed top-0 w-full bg-black text-white flex justify-between items-center z-50 shadow-lg px-[50px] py-[10px]">
        {/* Logo GIA a la izquierda */}
        <div className="flex-none">
          <Link href="/" className="text-white no-underline">
            <Image
              src={LOGO_GIA}
              alt="GIA"
              width={60}
              height={60}
              unoptimized={true}
            />
          </Link>
        </div>

        {/* Botón hamburguesa para móvil */}
        <button
          className="burger-menu md:hidden z-50 relative"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X size={24} className="text-white" style={{ color: "#ffffff" }} />
          ) : (
            <Menu
              size={24}
              className="text-white"
              style={{ color: "#ffffff" }}
            />
          )}
        </button>

        {/* Navegación desktop */}
        <nav className="nav-links hidden md:block">
          <ul className="flex gap-8 text-lg m-0 p-0 list-none">
            <li className="nav-item">
              <Link href="/" className="nav-link">
                <span className="nav-text">Inicio</span>
                <span className="nav-indicator"></span>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/noticias" className="nav-link">
                <span className="nav-text">Noticias</span>
                <span className="nav-indicator"></span>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/directorio" className="nav-link">
                <span className="nav-text">Directorio</span>
                <span className="nav-indicator"></span>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/donar" className="nav-link">
                <span className="nav-text">Donar</span>
                <span className="nav-indicator"></span>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contacto" className="nav-link">
                <span className="nav-text">Contáctanos</span>
                <span className="nav-indicator"></span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Menú móvil */}
        <div className={`mobile-menu ${isMenuOpen ? "mobile-menu-open" : ""}`}>
          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              <li className="mobile-nav-item">
                <Link href="/" className="mobile-nav-link" onClick={closeMenu}>
                  <span className="mobile-nav-text">Inicio</span>
                </Link>
              </li>
              <li className="mobile-nav-item">
                <Link
                  href="/noticias"
                  className="mobile-nav-link"
                  onClick={closeMenu}
                >
                  <span className="mobile-nav-text">Noticias</span>
                </Link>
              </li>
              <li className="mobile-nav-item">
                <Link
                  href="/directorio"
                  className="mobile-nav-link"
                  onClick={closeMenu}
                >
                  <span className="mobile-nav-text">Directorio</span>
                </Link>
              </li>
              <li className="mobile-nav-item">
                <Link
                  href="/donar"
                  className="mobile-nav-link"
                  onClick={closeMenu}
                >
                  <span className="mobile-nav-text">Donar</span>
                </Link>
              </li>
              <li className="mobile-nav-item">
                <Link
                  href="/contacto"
                  className="mobile-nav-link"
                  onClick={closeMenu}
                >
                  <span className="mobile-nav-text">Contáctanos</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Overlay para cerrar el menú */}
        {isMenuOpen && <div className="mobile-overlay" onClick={closeMenu} />}
      </header>
    </>
  );
};

export default Navbar;
