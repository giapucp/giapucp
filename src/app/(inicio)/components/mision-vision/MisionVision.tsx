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
            Nuestra misión es impulsar el conocimiento científico y tecnológico,
            formando profesionales íntegros capaces de liderar e innovar en el
            campo aeroespacial, contribuyendo activamente al desarrollo
            sostenible del país.
          </p>
        </div>

        <div ref={dividerRef} className="divider-line" />

        <div className="vision-section">
          <p ref={visionTextRef} className="text-block">
            Nuestra visión es consolidarnos como una comunidad académica de
            excelencia, reconocida por su impacto en la investigación y
            desarrollo aeroespacial a nivel nacional e internacional.
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
