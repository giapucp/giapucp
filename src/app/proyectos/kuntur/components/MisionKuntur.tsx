import React from 'react';
import Figura from '@/components/comun/figura/Figura';

export default function MisionKuntur() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12 text-gray-800">
      <section className="mb-12 md:mb-16 pb-8 border-b-2 border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-[#002366] font-display font-bold text-center lg:text-left">
            Misión KUNTUR-1
          </h1>
          <div className="flex flex-wrap justify-center lg:justify-start gap-2 lg:mt-2">
            <span className="rounded-xl bg-blue-50 text-[#002366] px-2.5 py-1 text-[10px] sm:text-xs font-bold tracking-wide uppercase border border-blue-200">
              LASC 2025
            </span>
            <span className="rounded-xl bg-blue-50 text-[#002366] px-2.5 py-1 text-[10px] sm:text-xs font-bold tracking-wide uppercase border border-blue-200">
              Team GIA - KUNTUR
            </span>
            <span className="rounded-xl bg-blue-50 text-[#002366] px-2.5 py-1 text-[10px] sm:text-xs font-bold tracking-wide uppercase border border-blue-200">
              Ing. Aeroespacial
            </span>
          </div>
        </div>

        <h2 className="text-lg sm:text-xl text-gray-600 font-primary mb-6 text-center lg:text-left">
          Primer Cohete de Sondeo Experimental de la PUCP para el LASC 2025
        </h2>
        <p className="text-base sm:text-lg max-w-4xl mx-auto lg:mx-0 mb-8 text-gray-700 font-primary text-justify lg:text-left">
          La Misión Kuntur-1 marca el inicio de una nueva era. Nuestro propósito es establecer las bases de la cohetería experimental y la tecnología aeroespacial en la Pontificia Universidad Católica del Perú (PUCP). Este vehículo de lanzamiento representa la primera participación internacional del Grupo de Ingeniería Aeroespacial (GIA) en una competencia de altísimo nivel, demostrando el talento y la capacidad de innovación de nuestros ingenieros.
        </p>
        <Figura nombre="vista-corte-transversal" alt="Vista de corte transversal del cohete" maxAncho="full" />
      </section>
      <section className="mb-12 md:mb-16">
        <h2 className="text-2xl sm:text-3xl text-gray-900 border-b-4 border-[#002366] pb-2 mb-6 inline-block font-display font-semibold">
          Visión General y Capacidades
        </h2>
        <p className="font-primary text-base sm:text-lg mb-6">
          Kuntur-1 es un vehículo de lanzamiento diseñado con precisión para superar los estándares de la categoría de 300 metros. Combina potencia bruta con aviónica inteligente.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 my-8">
          <div className="overflow-x-auto">
            <h3 className="text-lg sm:text-xl font-display font-semibold text-gray-800 mb-4">Ficha Técnica del Sistema</h3>
            <table className="w-full min-w-[300px] border-collapse bg-white shadow-sm rounded-lg overflow-hidden text-xs sm:text-sm md:text-base">
              <tbody>
                <tr>
                  <th className="p-3 sm:p-4 text-left border-b border-gray-200 bg-gray-50 font-semibold w-2/5 text-gray-800">Tipo</th>
                  <td className="p-3 sm:p-4 text-left border-b border-gray-200">Cohete de sondeo de motor sólido (Categoría 300 m LASC)</td>
                </tr>
                <tr>
                  <th className="p-3 sm:p-4 text-left border-b border-gray-200 bg-gray-50 font-semibold w-2/5 text-gray-800">Dimensiones</th>
                  <td className="p-3 sm:p-4 text-left border-b border-gray-200">Longitud: 1310 mm | Diámetro: 80 mm</td>
                </tr>
                <tr>
                  <th className="p-3 sm:p-4 text-left border-b border-gray-200 bg-gray-50 font-semibold w-2/5 text-gray-800">Masa Total</th>
                  <td className="p-3 sm:p-4 text-left border-b border-gray-200">5.080 kg</td>
                </tr>
                <tr>
                  <th className="p-3 sm:p-4 text-left border-b border-gray-200 bg-gray-50 font-semibold w-2/5 text-gray-800">Energía</th>
                  <td className="p-3 sm:p-4 text-left border-b border-gray-200">Batería 7.4V (2S) 3000 mAh (~45 min)</td>
                </tr>
                <tr>
                  <th className="p-3 sm:p-4 text-left border-b border-gray-200 bg-gray-50 font-semibold w-2/5 text-gray-800">Comunicación</th>
                  <td className="p-3 sm:p-4 text-left border-b border-gray-200">Enlace LoRa 433 MHz (RFM69)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="overflow-x-auto">
            <h3 className="text-lg sm:text-xl font-display font-semibold text-gray-800 mb-4">Datos de Rendimiento Balístico</h3>
            <table className="w-full min-w-[300px] border-collapse bg-white shadow-sm rounded-lg overflow-hidden text-xs sm:text-sm md:text-base">
              <tbody>
                <tr>
                  <th className="p-3 sm:p-4 text-left border-b border-gray-200 bg-gray-50 font-semibold w-2/5 text-gray-800">Apogeo Predicho</th>
                  <td className="p-3 sm:p-4 text-left border-b border-gray-200">513.5 m</td>
                </tr>
                <tr>
                  <th className="p-3 sm:p-4 text-left border-b border-gray-200 bg-gray-50 font-semibold w-2/5 text-gray-800">Velocidad Máx.</th>
                  <td className="p-3 sm:p-4 text-left border-b border-gray-200">99.84 m/s (Mach 0.29)</td>
                </tr>
                <tr>
                  <th className="p-3 sm:p-4 text-left border-b border-gray-200 bg-gray-50 font-semibold w-2/5 text-gray-800">Aceleración Máx.</th>
                  <td className="p-3 sm:p-4 text-left border-b border-gray-200">6.23 G</td>
                </tr>
                <tr>
                  <th className="p-3 sm:p-4 text-left border-b border-gray-200 bg-gray-50 font-semibold w-2/5 text-gray-800">Tiempo de Vuelo</th>
                  <td className="p-3 sm:p-4 text-left border-b border-gray-200">69.2 s</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg sm:text-xl font-display font-semibold text-gray-800 mb-4">Nuestros Diferenciadores Tecnológicos:</h3>
          <div className="list-disc ml-5 sm:ml-6 space-y-2 text-sm sm:text-base font-primary text-gray-700">
            <li><strong>Propulsor KNSB Optimizado:</strong> Utilizamos surfactante SLES y un proceso de curado bajo presión que nos permite alcanzar un 98% de la densidad teórica del combustible.</li>
            <li><strong>Aviónica Avanzada:</strong> Implementamos un Filtro de Kalman para el procesamiento de datos en tiempo real, garantizando una detección exacta del apogeo.</li>
          </div>
        </div>

        <Figura nombre="curva-empuje-presion" alt="Curva de empuje y presión de cámara" caption="Curva de empuje y presión de cámara del motor sólido" maxAncho="xl" className="my-8" />
      </section>

      <section className="mb-12 md:mb-16">
        <h2 className="text-2xl sm:text-3xl text-gray-900 border-b-4 border-[#002366] pb-2 mb-6 inline-block font-display font-semibold">
          Arquitectura del Sistema
        </h2>
        <p className="font-primary text-base sm:text-lg mb-6">
          El diseño modular de Kuntur-1 permite una integración segura y eficiente de todos sus subsistemas críticos:
        </p>
        <div className="list-disc ml-5 sm:ml-6 space-y-3 sm:space-y-4 font-primary text-sm sm:text-base">
          <li><strong>Carga Útil (Payload):</strong> Transportamos la Misión MiSat, un nanosatélite formato PocketQube (5x5x5 cm) diseñado para el monitoreo ambiental de la Amazonía.</li>
          <li><strong>Aviónica (OBC):</strong> El cerebro del cohete es un microcontrolador ESP32 DevKitC de doble núcleo a 240 MHz, respaldado por sensores BMP280 (Presión/Altitud) y MPU6050 (IMU/Actitud).</li>
          <li><strong>Propulsión:</strong> Configuración robusta de motor de 4 granos BATES con geometría interna estrictamente optimizada.</li>
          <li><strong>Estructura (STR):</strong> Construida con tubo de madera contrachapada de abedul y reforzada con fibra de vidrio. Cuenta con 3 módulos de acople rápido (slip-fit) asegurados con pernos de acero inoxidable para máxima integridad estructural.</li>
        </div>
        <Figura nombre="segmentos-fuselaje" alt="Segmentos del fuselaje" caption="Segmentos del fuselaje y módulos de acople" maxAncho="xl" className="my-4" />
        <Figura nombre="diagrama-hardware" alt="Diagrama de hardware" caption="Diagrama de hardware y conexiones del sistema" maxAncho="xl" className="my-4" />
      </section>

      <section className="mb-12 md:mb-16">
        <h2 className="text-2xl sm:text-3xl text-gray-900 border-b-4 border-[#002366] pb-2 mb-6 inline-block font-display font-semibold">
          Software y Estación Terrena
        </h2>
        <p className="font-primary text-base sm:text-lg mb-6">
          El control absoluto durante el vuelo requiere un procesamiento de datos impecable y telemetría en tiempo real.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 my-8">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm">
            <h3 className="text-lg sm:text-xl font-display font-semibold text-gray-800 mb-4">Lógica de Vuelo y Frecuencias</h3>
            <p className="mb-4 font-primary text-sm sm:text-base">Nuestra arquitectura utiliza un Sistema Operativo de Tiempo Real (RTOS) con 4 estados concurrentes, asegurando fiabilidad total.</p>
            <div className="list-disc ml-5 space-y-2 font-primary text-sm sm:text-base">
              <li>Procesamiento de Sensores: 100 Hz</li>
              <li>Lógica de Vuelo: 50 Hz</li>
              <li>Registro en Micro-SD: 10 Hz</li>
              <li>Telemetría LoRa: 2 Hz</li>
            </div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm">
            <h3 className="text-lg sm:text-xl font-display font-semibold text-gray-800 mb-4">Seguridad y Monitoreo</h3>
            <div className="list-disc ml-5 space-y-3 sm:space-y-4 font-primary text-sm sm:text-base">
              <li><strong>Detección de Apogeo:</strong> Confirmación rigurosa tras 10 lecturas consecutivas de velocidad negativa.</li>
              <li><strong>Telemetría Viva:</strong> Transmisión continua de datos vía LoRa hacia nuestra estación móvil.</li>
              <li><strong>Caja Negra:</strong> Almacenamiento de hasta 7 variables críticas por vuelo.</li>
            </div>
          </div>
        </div>
        <Figura nombre="diagrama-flujo-maestro" alt="Diagrama de flujo maestro" caption="Diagrama de flujo maestro del software de vuelo" maxAncho="full" className="my-8" />
      </section>

      <section className="mb-12 md:mb-16">
        <h2 className="text-2xl sm:text-3xl text-gray-900 border-b-4 border-[#002366] pb-2 mb-6 inline-block font-display font-semibold">
          Operación y el Equipo Detrás de la Misión
        </h2>

        <div className="mb-8">
          <h3 className="text-lg sm:text-xl font-display font-semibold text-gray-800 mb-4">Ciclo de la Misión (ConOps)</h3>
          <ol className="list-decimal ml-5 sm:ml-6 space-y-2 font-primary text-sm sm:text-base">
            <li><strong>Lanzamiento:</strong> Ignición pirotécnica remota y detección de despegue.</li>
            <li><strong>Apogeo:</strong> Liberación del nanosatélite MiSat y despliegue del paracaídas principal.</li>
            <li><strong>Recuperación:</strong> Descenso controlado a 8 m/s con seguimiento continuo mediante coordenadas GPS.</li>
          </ol>
        </div>

        <div className="mb-8">
          <h3 className="text-lg sm:text-xl font-display font-semibold text-gray-800 mb-4">Pruebas y Validación</h3>
          <p className="font-primary text-sm sm:text-base text-justify md:text-left">
            Para garantizar la supervivencia de nuestra electrónica, los componentes han superado pruebas de vibración extrema (0-200 Hz) y estrés térmico (0-60°C). Además, contamos con un estricto análisis de riesgo para el manejo seguro de combustibles y cargas de eyección.
          </p>
        </div>

        <div className="bg-gray-50 p-6 sm:p-8 rounded-lg mt-8 border-l-4 border-[#002366] shadow-sm">
          <h3 className="text-lg sm:text-xl font-display font-semibold text-gray-800 mb-4">Equipo GIA PUCP - KUNTUR 1</h3>
          <p className="italic text-gray-600 font-primary text-sm sm:text-base leading-relaxed">
            Roberto Muñoz, Diomedes Víctor Alejandro Paredes Asurza, Diego André Mora Jaimes, Angelo Felipe Camero Farfán, Marcelo Julián Ramos Ruiz, Felipe Carbajal Samamé, Atilio Javier Molero, Sebastián Alfredo Vásquez Quispe, Edward Valderrama Inga, Santiago Marcelo Rodríguez Saavedra.
          </p>
        </div>
      </section>
    </div>
  );
}