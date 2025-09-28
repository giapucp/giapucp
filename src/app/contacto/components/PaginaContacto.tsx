import ContactHeader from "./contact-header/ContactHeader";
import "./PaginaContacto.css";
import ContactSection from "./contact-section/ContactSection";

export default function PaginaContacto() {
  return (
    <div className="container-contacto">
      <ContactHeader />
      <ContactSection />
    </div>
  );
}
