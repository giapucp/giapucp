"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from 'next/image';
import "./RumboBrasil.css";

gsap.registerPlugin(ScrollTrigger);

const RumboBrasil: React.FC = () => {
  const rumboBrasilRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const rumboTitleRef = useRef<HTMLHeadingElement>(null);
  const rumboSubtitleRef = useRef<HTMLHeadingElement>(null);
  const rumboTextRef = useRef<HTMLParagraphElement>(null);
  const rumboImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const createScrollTriggerAnimation = (
      targetRef: React.RefObject<Element>,
      initialProps: gsap.TweenVars,
      finalProps: gsap.TweenVars,
      delay = 0,
      triggerStart = "top 80%",
    ) => {
      const el = targetRef.current;
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, ...initialProps },
        {
          opacity: 1,
          ...finalProps,
          duration: 1,
          delay: delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rumboBrasilRef.current,
            start: triggerStart,
            toggleActions: "play reverse play reverse",
          },
        },
      );
    };

    createScrollTriggerAnimation(rumboBrasilRef as React.RefObject<Element>, { y: 100 }, { y: 0 }, 0, "top 80%");
    createScrollTriggerAnimation(rumboTitleRef as React.RefObject<Element>, { x: -100 }, { x: 0 }, 0.2, "top 75%");
    createScrollTriggerAnimation(rumboSubtitleRef as React.RefObject<Element>, { x: 100 }, { x: 0 }, 0.4, "top 70%");
    createScrollTriggerAnimation(rumboTextRef as React.RefObject<Element>, { y: 50 }, { y: 0 }, 0.6, "top 65%");
    createScrollTriggerAnimation(rumboImageRef as React.RefObject<Element>, { scale: 0.5 }, { scale: 1, ease: "back.out(1.7)" }, 0.8, "top 60%");

    if (scrollIndicatorRef.current) {
      gsap.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: scrollIndicatorRef.current,
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          },
        },
      );
    }
  }, []);

  return (
    <div className="page4 flex flex-col items-center">
      <section
        ref={rumboBrasilRef}
        className="rumbo-a-brasil w-full min-h-[50vh] flex justify-center items-center bg-white text-black"
      >
        <div className="rumbo-content">
          <h1 ref={rumboTitleRef} className="rumbo-title">
            RUMBO A BRASIL
          </h1>
          <h2 ref={rumboSubtitleRef} className="rumbo-subtitle">
            Latin America Space Challenge <br /> 6ta edición
          </h2>
          <p ref={rumboTextRef} className="rumbo-text">
            Oficialmente ya estamos dentro de la lista de participantes de esta
            nueva edición que se llevará a cabo entre el 5 y 8 de noviembre de
            2025, en las ciudades de Bauru e Iacanga en el estado de São Paulo,
            Brasil.
          </p>
        </div>
        <div className="rumbo-image-container">
          <Image
            ref={rumboImageRef}
            src="/brasil-edition.png"
            alt="LASC Sixth Edition Rocket-Satellite"
            className="rumbo-image"
            loading="lazy"
            width={500}
            height={500}
          />
        </div>
      </section>
    </div>
  );
};

export default RumboBrasil;
