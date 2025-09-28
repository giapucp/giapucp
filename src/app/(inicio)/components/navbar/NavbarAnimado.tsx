"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X } from "lucide-react";
import "./NavbarAnimado.css";

import {Space_Mono} from "next/font/google";

const spaceMono = Space_Mono({ style: "normal", subsets: ["latin"], weight: "700" });

gsap.registerPlugin(ScrollTrigger);

function NavbarAnimado() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const middleLogoRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (!middleLogoRef.current || !headerRef.current || !containerRef.current)
      return;

    const ctx = gsap.context(() => {
      gsap.set(middleLogoRef.current, {
        scale: 6,
        y: 200,
        x: 0,
      });

      gsap.to(middleLogoRef.current, {
        scale: 1,
        y: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".page1",
          start: "top top",
          end: "center top",
          scrub: 1,
        },
      });

      ScrollTrigger.create({
        trigger: ".page1",
        start: "center top",
        onEnter: () => {
          gsap.set(middleLogoRef.current, { y: 0 });
        },
      });

      gsap.fromTo(
        middleLogoRef.current,
        { x: 0 },
        {
          x: window.innerWidth <= 768 ? "-34vw" : "-40vw",
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: ".page1",
            start: "center top",
            end: "bottom top",
            scrub: 1,
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.to(headerRef.current, {
        backgroundColor: "#000000",
        boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        scrollTrigger: {
          trigger: ".page1",
          start: "top top",
          end: "30% top",
          scrub: 1.5,
        },
      });

      const timerId = setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, 50);

      return () => {
        clearTimeout(timerId);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="navbar-container" ref={containerRef}>
      <header
        ref={headerRef}
        className="navbar-header fixed top-0 left-0 w-full flex justify-between items-center px-10 py-5 z-50 text-white transition-all duration-300"
      >
        <div className="w-[100px]" />

        <div className="middle-logo absolute left-0 w-full flex justify-center pointer-events-none z-10">
          <h1
            ref={middleLogoRef}
            style={{ transform: "scale(6) translateY(10px)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/logos/logo-gia-inversion.png" 
              alt="GIA"
              style={{ width: "10vw", maxWidth: "60px", height: "auto"}} />

          </h1>
        </div>

        <button
          className="burger-menu md:hidden z-20 relative"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X size={24} className="text-white" />
          ) : (
            <Menu size={24} className="text-white" />
          )}
        </button>

        <nav className="nav-links hidden md:block">
          <ul className="flex gap-16 text-lg m-0 p-0 list-none">
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

        {isMenuOpen && <div className="mobile-overlay" onClick={closeMenu} />}
      </header>

      <div className="page1">
        <h2 className={`${spaceMono.className}`}>GRUPO DE INGENIERIA</h2>
        <h2 className={`${spaceMono.className}`}>AEROESPACIAL</h2>
      </div>
    </div>
  );
}

export default NavbarAnimado;
