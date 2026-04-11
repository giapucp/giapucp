"use client";

import { ContactForm } from "./contact-form/ContactForm";
import { ContactInfo } from "./contact-info/ContactInfo";

const ContactSection = () => {
  return (
    <main className="w-full bg-gray-50 text-gray-900 min-h-screen py-8 px-4 flex flex-col items-center">
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-stretch">
        
        {/* Lado izquierdo: Formulario */}
        <section className="w-full lg:w-2/3 bg-white border border-gray-200 rounded-3xl shadow-xl overflow-hidden flex flex-col">
          <div className="px-6 py-8 text-center border-b border-gray-200">
            <h1 className="text-3xl md:text-4xl font-black mb-3 text-gray-900">Envíanos un mensaje</h1>
            <h2 className="text-gray-600 text-lg font-medium">Estamos listos para responder tus dudas y colaborar</h2>
          </div>
          <div className="p-6 md:p-8 flex-grow">
            <ContactForm />
          </div>
        </section>

        {/* Lado derecho: Info de contacto */}
        <section className="w-full lg:w-1/3 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col">
          <ContactInfo />
        </section>

      </div>
    </main>
  );
};

export default ContactSection;
