"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HistoriaInicio.css";

gsap.registerPlugin(ScrollTrigger);

const HistoriaInicio: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const p1Ref = useRef<HTMLParagraphElement>(null);
  const p2Ref = useRef<HTMLParagraphElement>(null);
  const p3Ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const animateFromBottom = (target: Element | null, delay = 0) => {
      if (!target) return;
      gsap.fromTo(
        target,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: target,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        },
      );
    };
    animateFromBottom(titleRef.current, 0);
    animateFromBottom(p1Ref.current, 0.15);
    animateFromBottom(p2Ref.current, 0.3);
    animateFromBottom(p3Ref.current, 0.45);
  }, []);

  return (
    <section className="historia-inicio">
      <div className="container">
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
          De una bolsita de azucar{" "}
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
