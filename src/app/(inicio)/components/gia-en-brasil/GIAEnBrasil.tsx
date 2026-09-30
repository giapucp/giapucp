"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Medal } from "lucide-react";
import "./GIAEnBrasil.css";

gsap.registerPlugin(ScrollTrigger);

const RumboBrasil: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !timelineRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".lasc-timeline-item",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.18,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="lasc-history"
      aria-labelledby="lasc-history-title"
    >
      <div className="lasc-history-inner">
        <div className="lasc-history-header">
          <h2 id="lasc-history-title">GIA EN BRASIL</h2>
          <p>
            Participaciones y resultados del Latin America Space Challenge.
          </p>
        </div>

        <ol
          ref={timelineRef}
          className="lasc-timeline"
          aria-label="Participaciones de GIA en el LASC por año"
        >
          <li className="lasc-timeline-item">
            <div className="lasc-timeline-year" aria-hidden="true">
              2026
            </div>
            <article className="lasc-event-card">
              <div className="lasc-event-header">
                <div>
                  <p className="lasc-event-kicker">
                    7.ª edición · 2 al 5 de septiembre
                  </p>
                  <h3>Latin America Space Challenge 2026</h3>
                  <div className="lasc-event-groups">
                    <section className="lasc-event-group" aria-labelledby="lasc-participation-2026">
                      <h4 id="lasc-participation-2026">Participación</h4>
                      <ul className="lasc-result-list">
                        <li className="lasc-result-card lasc-result-card--participation">
                          <Image
                            src="/kuntur-mission-patch.png"
                            alt="Parche oficial de la misión Kuntur-1"
                            className="lasc-mission-patch"
                            width={160}
                            height={160}
                            sizes="80px"
                          />
                          <span className="lasc-result-copy">
                            <span className="lasc-result-name">Kuntur-1</span>
                            <span>Cohetería de 500 m</span>
                            <strong>7.º de 21</strong>
                          </span>
                        </li>
                        <li className="lasc-result-card lasc-result-card--participation">
                          <Image
                            src="/misat-mission-patch.png"
                            alt="Parche oficial de la misión MiSat PocketQube"
                            className="lasc-mission-patch"
                            width={160}
                            height={160}
                            sizes="80px"
                          />
                          <span className="lasc-result-copy">
                            <span className="lasc-result-name">MiSat</span>
                            <span>PocketQube</span>
                            <strong>10.º de 24</strong>
                          </span>
                        </li>
                      </ul>
                    </section>
                    <section className="lasc-event-group" aria-labelledby="lasc-achievements-2026">
                      <h4 id="lasc-achievements-2026">Logros</h4>
                      <ul className="lasc-result-list">
                        <li className="lasc-result-card">
                          <Image
                            src="/conduct-award-2026.png"
                            alt="Premio Team Conduct Award 2026"
                            className="lasc-conduct-award"
                            width={160}
                            height={160}
                            sizes="80px"
                          />
                          <span className="lasc-result-copy">
                            <strong>Team Conduct Award</strong>
                          </span>
                        </li>
                        <li className="lasc-result-card">
                          <Medal aria-hidden="true" />
                          <span className="lasc-result-copy">
                            <strong>2 Podium Sessions</strong>
                          </span>
                        </li>
                      </ul>
                    </section>
                  </div>
                </div>
                <Image
                  src="/lasc-2026-patch.jpg"
                  alt="Insignia oficial del Latin America Space Challenge 2026, séptima edición"
                  className="lasc-edition-badge"
                  width={480}
                  height={480}
                  sizes="(max-width: 640px) 176px, (max-width: 900px) 208px, 240px"
                />
              </div>
            </article>
          </li>

          <li className="lasc-timeline-item">
            <div className="lasc-timeline-year" aria-hidden="true">
              2025
            </div>
            <article className="lasc-event-card">
              <div className="lasc-event-header">
                <div>
                  <p className="lasc-event-kicker">
                    6.ª edición · 5 al 8 de noviembre
                  </p>
                  <h3>Latin America Space Challenge 2025</h3>
                  <div className="lasc-event-groups lasc-event-groups--single">
                    <section className="lasc-event-group" aria-labelledby="lasc-participation-2025">
                      <h4 id="lasc-participation-2025">Participación</h4>
                      <ul className="lasc-result-list lasc-result-list--two-columns">
                        <li className="lasc-result-card lasc-result-card--participation">
                          <Image
                            src="/kuntur-mission-patch.png"
                            alt="Parche oficial de la misión Kuntur 1"
                            className="lasc-mission-patch"
                            width={160}
                            height={160}
                            sizes="80px"
                          />
                          <span className="lasc-result-copy">
                            <span className="lasc-result-name">Kuntur-1</span>
                            <span>Cohetería de 500 m</span>
                            <strong>7.º de 26</strong>
                          </span>
                        </li>
                        <li className="lasc-result-card lasc-result-card--participation">
                          <Image
                            src="/misat-mission-patch.png"
                            alt="Parche oficial de la misión MiSat CanSats"
                            className="lasc-mission-patch"
                            width={160}
                            height={160}
                            sizes="80px"
                          />
                          <span className="lasc-result-copy">
                            <span className="lasc-result-name">MiSat</span>
                            <span>PocketQube</span>
                            <strong>9.º de 30</strong>
                          </span>
                        </li>
                      </ul>
                    </section>
                  </div>
                </div>
                <Image
                  src="/brasil-edition.png"
                  alt="Insignia oficial de GIA para la sexta edición del Latin America Space Challenge"
                  className="lasc-edition-badge"
                  width={348}
                  height={402}
                  sizes="(max-width: 640px) 176px, (max-width: 900px) 208px, 240px"
                />
              </div>
            </article>
          </li>

        </ol>
      </div>

    </section>
  );
};

export default RumboBrasil;