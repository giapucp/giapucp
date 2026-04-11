"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HistoriaInicio.css";

gsap.registerPlugin(ScrollTrigger);

const HistoriaInicio: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const p1Ref = useRef<HTMLParagraphElement>(null);
  const p2Ref = useRef<HTMLParagraphElement>(null);
  const p3Ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const animateFromBottom = (target: Element | null, delay = 0) => {
        if (!target) return;
        gsap.fromTo(
          target,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: target,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      };

      // Animar la línea decorativa con un efecto de expansión
      if (accentRef.current) {
        gsap.fromTo(
          accentRef.current,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: accentRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      animateFromBottom(titleRef.current, 0.1);
      animateFromBottom(p1Ref.current, 0.2);
      animateFromBottom(p2Ref.current, 0.35);
      animateFromBottom(p3Ref.current, 0.5);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="historia-inicio" ref={sectionRef}>
      <div className="container">
        <div className="accent-line" ref={accentRef} />
        <h2 ref={titleRef}>Un sueño que despegó con azúcar</h2>
        <p ref={p1Ref}>
          Todo empezó a fines de 2023, con una chispa inesperada en un lugar
          lleno de ideas: un curso electivo sobre tecnologías espaciales.
        </p>
        <p ref={p2Ref}>
          En medio de ideas y sueños, nació una ilusión. Y con el impulso y la
          motivación del profesor
          <strong> Neils Vilchez</strong>, un grupo de estudiantes decidió no
          dejar que esa ilusión se apague. En febrero de 2024, nos invita por
          primera vez la Agencia Espacial del Perú y el resto fue historia.
        </p>
        <p ref={p3Ref}>
          De una bolsita de azúcar{" "}
          <strong>nuestro primer experimento con propelente</strong> nació todo.
          Aprendimos, reímos, fallamos y volvimos a intentarlo. Hoy somos un
          equipo de futuros ingenieros, científicos, y profesionales que cree
          con fuerza que el espacio no está tan lejos. Y estamos seguros de que
          sí se puede.
        </p>
      </div>
    </section>
  );
};

export default HistoriaInicio;
