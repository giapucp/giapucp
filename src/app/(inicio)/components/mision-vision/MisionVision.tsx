"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./MisionVision.css";

gsap.registerPlugin(ScrollTrigger);

const MissionVisionSection: React.FC = () => {
  const missionTitleRef = useRef<HTMLHeadingElement>(null);
  const missionTextRef = useRef<HTMLParagraphElement>(null);
  const visionTitleRef = useRef<HTMLHeadingElement>(null);
  const visionTextRef = useRef<HTMLParagraphElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animateFromLeft = (target: Element | null) => {
      if (!target) return;
      gsap.fromTo(
        target,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: target,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        },
      );
    };

    const animateDivider = (target: Element | null) => {
      if (!target) return;
      gsap.fromTo(
        target,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: target,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        },
      );
    };

    animateFromLeft(missionTitleRef.current);
    animateFromLeft(missionTextRef.current);
    animateDivider(dividerRef.current);
    animateFromLeft(visionTextRef.current);
    animateFromLeft(visionTitleRef.current);
  }, []);

  return (
    <section className="page3-section">
      <div className="content-wrapper">
        <div className="mision-section">
          <h2 ref={missionTitleRef} className="title-left">
            MISIÓN
          </h2>
          <p ref={missionTextRef} className="text-block">
            Formar ingenieros y científicos mediante la investigación y 
            el desarrollo experimental en cohetería y ciencias espaciales, 
            ejecutando proyectos reales que integren formación técnica 
            aplicada, producción de conocimiento académico y validación 
            tecnológica, contribuyendo al desarrollo del ecosistema a
            eroespacial peruano desde la universidad.
          </p>
        </div>
        <div ref={dividerRef} className="divider-line" />
        <div className="vision-section">
          <p ref={visionTextRef} className="text-block">
            Ser el grupo universitario de referencia en cohetería experimental
             y ciencias espaciales en el Perú, reconocido por su producción 
             científica, la validación en vuelo de sus desarrollos, 
             su aporte a la formación de talento de alto nivel y su capacidad 
             de sostener operaciones mediante una estructura organizacional 
             autónoma, profesional y financieramente viable.
          </p>
          <h2 ref={visionTitleRef} className="title-right">
            VISIÓN
          </h2>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
