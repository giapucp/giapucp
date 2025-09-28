import "./ContactSection.css";
import {ContactForm} from "./contact-form/ContactForm";
import {ContactInfo} from "./contact-info/ContactInfo";

const ContactSection = () => {
  return (
    <section className="contact-section-background contact-section-padding">
      {/* Bloque blanco con padding interno, bordes redondeados y sombra */}
      <div className="contact-card">
        {/* Contenedor del contenido, que sí tendrá la línea divisoria interna */}
        <div className="contact-content-grid">
          {/* Lado izquierdo: Formulario */}
          <div className="contact-form-container">
            <ContactForm />
          </div>

          {/* Lado derecho: Info de contacto */}
          <div className="contact-info-container">
            <ContactInfo />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
