import Navbar from "@/components/comun/navbar/Navbar";

import Banner from "@/components/comun/banner/Banner"
import Figura from '@/components/comun/figura/Figura';

const MiSat = () => {
  return (
    <>
        <Navbar />
        <Banner nombre="misat" titulo="MiSat" altura="lg" />
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12 text-gray-800">
        
        <section className="mb-12 md:mb-16 pb-8 border-b-2 border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl text-[#002366] font-display font-bold text-center lg:text-left">
              Misión MISAT-2
            </h1>
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 lg:mt-2">
              <span className="rounded-xl bg-blue-50 text-[#002366] px-2.5 py-1 text-[10px] sm:text-xs font-bold tracking-wide uppercase border border-blue-200">
                LASC 2025
              </span>
              <span className="rounded-xl bg-blue-50 text-[#002366] px-2.5 py-1 text-[10px] sm:text-xs font-bold tracking-wide uppercase border border-blue-200">
                Team GIA - MISAT
              </span>
              <span className="rounded-xl bg-blue-50 text-[#002366] px-2.5 py-1 text-[10px] sm:text-xs font-bold tracking-wide uppercase border border-blue-200">
                Ing. Electrónica & Mecatrónica
              </span>
            </div>
          </div>
          <h2 className="text-lg sm:text-xl text-gray-600 font-primary mb-6 text-center lg:text-left">
            Prototipo PocketQube de Monitoreo Ambiental e Inteligencia Artificial
          </h2>
          <p className="text-base sm:text-lg max-w-4xl mx-auto lg:mx-0 mb-8 text-gray-700 font-primary text-justify lg:text-left">
            La Misión MISAT-2 nace como respuesta directa a la crisis ambiental que enfrenta la Amazonía: más de 13,000 km² de bosque perdidos solo en Brasil. Nuestro objetivo es validar un sistema satelital compacto, inteligente y autónomo, capaz de detectar incendios forestales desde el aire utilizando visión por computadora, y transmitir datos de monitoreo ambiental en tiempo real hacia una estación terrena. MISAT-2 demuestra que la tecnología espacial puede ser accesible, modular y orientada a resolver problemas reales.
          </p>
          <Figura nombre="render-satelite-completo" alt="Render del satélite MISAT-2 completo" maxAncho="full" />
        </section>
        
        <section className="mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl text-gray-900 border-b-4 border-[#002366] pb-2 mb-6 inline-block font-display font-semibold">
            Visión General y Capacidades
          </h2>
          <p className="font-primary text-base sm:text-lg mb-6">
            MISAT-2 es un nanosatélite formato PocketQube 1P diseñado para operar de forma autónoma. Integra sensores ambientales, GPS, una unidad de inteligencia artificial y un sistema de comunicaciones LoRa en un volumen de tan solo 50 × 50 × 114 mm.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 my-8">
            <div className="overflow-x-auto">
              <h3 className="text-lg sm:text-xl font-display font-semibold text-gray-800 mb-4">Ficha Técnica del Sistema</h3>
              <table className="w-full min-w-[300px] border-collapse bg-white shadow-sm rounded-lg overflow-hidden text-xs sm:text-sm md:text-base">
                <tbody>
                  <tr>
                    <th className="p-3 sm:p-4 text-left border-b border-gray-200 bg-gray-50 font-semibold w-2/5 text-gray-800">Tipo</th>
                    <td className="p-3 sm:p-4 text-left border-b border-gray-200">PocketQube 1P</td>
                  </tr>
                  <tr>
                    <th className="p-3 sm:p-4 text-left border-b border-gray-200 bg-gray-50 font-semibold w-2/5 text-gray-800">Dimensiones</th>
                    <td className="p-3 sm:p-4 text-left border-b border-gray-200">50 × 50 × 114 mm</td>
                  </tr>
                  <tr>
                    <th className="p-3 sm:p-4 text-left border-b border-gray-200 bg-gray-50 font-semibold w-2/5 text-gray-800">Masa Total</th>
                    <td className="p-3 sm:p-4 text-left border-b border-gray-200">412.5 g</td>
                  </tr>
                  <tr>
                    <th className="p-3 sm:p-4 text-left border-b border-gray-200 bg-gray-50 font-semibold w-2/5 text-gray-800">Energía</th>
                    <td className="p-3 sm:p-4 text-left border-b border-gray-200">Baterías Li-Ion 7.4V — Autonomía &gt; 4 horas</td>
                  </tr>
                  <tr>
                    <th className="p-3 sm:p-4 text-left border-b border-gray-200 bg-gray-50 font-semibold w-2/5 text-gray-800">Comunicación</th>
                    <td className="p-3 sm:p-4 text-left border-b border-gray-200">LoRa 433 MHz (Módulo RFM69HCW)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="overflow-x-auto">
              <h3 className="text-lg sm:text-xl font-display font-semibold text-gray-800 mb-4">Datos de Rendimiento</h3>
              <table className="w-full min-w-[300px] border-collapse bg-white shadow-sm rounded-lg overflow-hidden text-xs sm:text-sm md:text-base">
                <tbody>
                  <tr>
                    <th className="p-3 sm:p-4 text-left border-b border-gray-200 bg-gray-50 font-semibold w-2/5 text-gray-800">Frecuencia CPU</th>
                    <td className="p-3 sm:p-4 text-left border-b border-gray-200">240 MHz</td>
                  </tr>
                  <tr>
                    <th className="p-3 sm:p-4 text-left border-b border-gray-200 bg-gray-50 font-semibold w-2/5 text-gray-800">Consumo Prom.</th>
                    <td className="p-3 sm:p-4 text-left border-b border-gray-200">1243.13 mW</td>
                  </tr>
                  <tr>
                    <th className="p-3 sm:p-4 text-left border-b border-gray-200 bg-gray-50 font-semibold w-2/5 text-gray-800">Consumo Pico</th>
                    <td className="p-3 sm:p-4 text-left border-b border-gray-200">1824.53 mW</td>
                  </tr>
                  <tr>
                    <th className="p-3 sm:p-4 text-left border-b border-gray-200 bg-gray-50 font-semibold w-2/5 text-gray-800">Pot. Transmisión</th>
                    <td className="p-3 sm:p-4 text-left border-b border-gray-200">10 dBm</td>
                  </tr>
                  <tr>
                    <th className="p-3 sm:p-4 text-left border-b border-gray-200 bg-gray-50 font-semibold w-2/5 text-gray-800">Temp. Operativa</th>
                    <td className="p-3 sm:p-4 text-left border-b border-gray-200">−20 a +60 °C</td>
                  </tr>
                  <tr>
                    <th className="p-3 sm:p-4 text-left border-b border-gray-200 bg-gray-50 font-semibold w-2/5 text-gray-800">Vel. de Descenso</th>
                    <td className="p-3 sm:p-4 text-left border-b border-gray-200">10 m/s (con paracaídas)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg sm:text-xl font-display font-semibold text-gray-800 mb-4">Nuestros Diferenciadores Tecnológicos:</h3>
            <div className="list-disc ml-5 sm:ml-6 space-y-2 text-sm sm:text-base font-primary text-gray-700">
              <li><strong>Inteligencia Artificial a Bordo:</strong> Empleamos visión por computadora con el modelo YOLO para detectar humo y fuego de forma autónoma directamente en el satélite, sin depender de procesamiento en tierra.</li>
              <li><strong>Arquitectura Modular:</strong> El diseño está optimizado en 5 subsistemas plenamente integrados (EPS, OBC, COM, PAYLOAD y STR), lo que facilita el mantenimiento, las pruebas y la escalabilidad futura.</li>
            </div>
          </div>

          <Figura nombre="diagrama-bloques-pcb" alt="Diagrama de bloques y PCB principal de MISAT-2" caption="Diagrama de bloques del sistema y PCB principal" maxAncho="xl" className="my-8" />
        </section>

        
        <section className="mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl text-gray-900 border-b-4 border-[#002366] pb-2 mb-6 inline-block font-display font-semibold">
            Arquitectura del Sistema
          </h2>
          <p className="font-primary text-base sm:text-lg mb-6">
            MISAT-2 integra cinco subsistemas especializados en un diseño de 28 piezas que encajan con precisión milimétrica:
          </p>

          <div className="list-disc ml-5 sm:ml-6 space-y-3 sm:space-y-4 font-primary text-sm sm:text-base">
            <li>
              <strong>PAYLOAD (Carga Útil):</strong> Conjunto de sensores ambientales: BME280 (temperatura, presión y humedad), SenseAir S8 (CO₂), ML8511 (radiación UV) y GY-87 (IMU — aceleración y giroscopio). La cámara ESP32-CAM complementa el payload con capacidad de detección visual de incendios.
            </li>
            <li>
              <strong>OBC (Computadora a Bordo):</strong> El cerebro del satélite es un Wemos ESP32-S2 Mini a 240 MHz, responsable de la adquisición de datos de todos los sensores, el empaquetado de la telemetría y la coordinación de los demás subsistemas.
            </li>
            <li>
              <strong>EPS (Sistema de Energía):</strong> Configuración de baterías Li-Ion en arreglo 2S2P, gestionada por un BMS de protección. Incluye "Killer Switches" de seguridad para la fase de integración con el cohete.
            </li>
            <li>
              <strong>COM (Comunicaciones):</strong> Módulo de radio RFM69HCW y antena Rubber de 433 MHz para el enlace bidireccional con la estación terrena.
            </li>
            <li>
              <strong>STR (Estructura):</strong> Fabricada en PETG mediante impresión 3D y reforzada con aluminio. El diseño modular de 28 piezas garantiza resistencia estructural durante las fases de lanzamiento y descenso.
            </li>
          </div>

          <Figura nombre="vista-explotada" alt="Vista explotada del satélite MISAT-2" caption="Vista explotada (Exploded View) — integración de los 5 subsistemas" maxAncho="full" className="my-8" />
          <Figura nombre="diagrama-conexiones" alt="Diagrama de conexiones electrónicas" caption="Diagrama de conexiones electrónicas del sistema" maxAncho="xl" className="my-4" />
        </section>

      
        <section className="mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl text-gray-900 border-b-4 border-[#002366] pb-2 mb-6 inline-block font-display font-semibold">
            Software y Estación Terrena
          </h2>
          <p className="font-primary text-base sm:text-lg mb-6">
            Los datos captados por MISAT-2 llegan a tierra a través de un dashboard desarrollado en Python con PyQt6, que centraliza telemetría, posición y alertas de IA en una sola interfaz operativa.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 my-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="text-lg sm:text-xl font-display font-semibold text-gray-800 mb-4">Dashboard de Telemetría</h3>
              <p className="mb-4 font-primary text-sm sm:text-base">Desarrollado en Python (PyQt6), integra visualización de datos, posición y módulo de visión artificial en una sola ventana.</p>
              <div className="list-disc ml-5 space-y-2 font-primary text-sm sm:text-base">
                <li>Gráficos de telemetría ambiental en tiempo real</li>
                <li>Modelo 3D interactivo (gemelo digital) sincronizado con la actitud del satélite</li>
                <li>Mapa GPS dinámico integrado (Leaflet)</li>
                <li>Indicadores visuales de alerta ante detección de humo o fuego</li>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="text-lg sm:text-xl font-display font-semibold text-gray-800 mb-4">Hardware en Tierra y Datos Entregados</h3>
              <div className="list-disc ml-5 space-y-3 sm:space-y-4 font-primary text-sm sm:text-base">
                <li><strong>Recepción:</strong> Antena Yagi-Uda de diseño propio para recepción de largo alcance.</li>
                <li><strong>Telemetría ambiental:</strong> Temperatura, presión, humedad, UV y CO₂.</li>
                <li><strong>Telemetría de actitud:</strong> Aceleración y giroscopio (IMU).</li>
                <li><strong>Posición:</strong> Coordenadas GPS en tiempo real.</li>
                <li><strong>Evento IA:</strong> Detección de humo/fuego con imagen de evidencia adjunta.</li>
              </div>
            </div>
          </div>

          <Figura nombre="dashboard-interfaz" alt="Captura de pantalla del dashboard de la estación terrena" caption="Interfaz completa de la estación terrena — telemetría, mapa y módulo IA" maxAncho="full" className="my-8" />
          <Figura nombre="deteccion-fuego-ia" alt="Ejemplo de detección de fuego por inteligencia artificial" caption="Detección de incendio mediante visión por computadora (modelo YOLO)" maxAncho="xl" className="my-4" />
        </section>

        
        <section className="mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl text-gray-900 border-b-4 border-[#002366] pb-2 mb-6 inline-block font-display font-semibold">
            Operación y el Equipo Detrás de la Misión
          </h2>

          <div className="mb-8">
            <h3 className="text-lg sm:text-xl font-display font-semibold text-gray-800 mb-4">Ciclo de la Misión (ConOps)</h3>
            <ol className="list-decimal ml-5 sm:ml-6 space-y-2 font-primary text-sm sm:text-base">
              <li><strong>Pre-lanzamiento:</strong> Integración del PocketQube con el cohete Kuntur-1, carga de baterías, verificación de comunicaciones y calibración de sensores.</li>
              <li><strong>Ascenso:</strong> Adquisición continua de telemetría y monitoreo del estado de todos los subsistemas durante el vuelo.</li>
              <li><strong>Despliegue (~500 m):</strong> Operación nominal: sensado ambiental, transmisión de datos y captura de imágenes con detección automática de incendios.</li>
              <li><strong>Descenso y Recuperación:</strong> Descenso controlado a 10 m/s con paracaídas, seguimiento GPS y revisión post-misión de los registros.</li>
            </ol>
            <p className="mt-4 font-primary text-sm sm:text-base text-gray-600">
              <strong>Flujo de datos:</strong> Sensores / Cámara → OBC → Empaquetado → Radio → Estación Terrena → Dashboard + Alerta IA (si aplica).
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg sm:text-xl font-display font-semibold text-gray-800 mb-4">Pruebas y Validación</h3>
            <p className="font-primary text-sm sm:text-base text-justify md:text-left mb-3">
              Antes del vuelo, el sistema ha sido sometido a un protocolo riguroso de verificación que incluye calibración de sensores en tierra, verificación del enlace PocketQube ↔ estación terrena, y pruebas de estabilidad del software con control de latencia, frames y buffer para evitar cuellos de botella. La telemetría se registra automáticamente en archivo para análisis post-misión.
            </p>
            <p className="font-primary text-sm sm:text-base text-justify md:text-left">
              El análisis de riesgos (Hazard Analysis) contempla mitigaciones para los escenarios más críticos: errores de calibración, sobrecalentamiento de batería, falla de despliegue del paracaídas, pérdida de comunicación y estrés mecánico en la cámara. Cada riesgo cuenta con un plan de contingencia validado en tierra.
            </p>
          </div>

          <div className="bg-gray-50 p-6 sm:p-8 rounded-lg mt-8 border-l-4 border-[#002366] shadow-sm">
            <h3 className="text-lg sm:text-xl font-display font-semibold text-gray-800 mb-4">Equipo GIA PUCP - MISAT</h3>
            <p className="italic text-gray-600 font-primary text-sm sm:text-base leading-relaxed">
              Claudia Vera, Rolando Misari, Gonzalo Mercado, Sebastián Heredia, Sebastian Silva, Kevin Marceliano, Alessandro Esteban, Andres Aquize, Marcelo Ramos.
            </p>
          </div>
        </section>

      </div>
    </>
  );
};

export default MiSat;