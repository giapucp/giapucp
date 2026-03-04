import Image from "next/image";
import "./ContactInfo.css";

export const ContactInfo = () => {
  const contactLinks = [
    {
      icon: "/logos/instagram.png",
      text: "@gia_pucp",
      href: "https://www.instagram.com/gia_pucp",
      isLink: true, // Agregamos esta propiedad
    },
    {
      icon: "/logos/linkedin.png",
      text: "GIA PUCP",
      href: "https://www.linkedin.com/company/gia-at-pucp",
      isLink: true,
    },
    {
      icon: "/logos/gmail.png",
      text: "grupo.gia@pucp.edu.pe",
      isLink: false, // No es un enlace
    },
    {
      icon: "/logos/ws.png",
      text: "+51 963 065 928",
      href: "https://wa.me/51963065928",
      isLink: true,
    },
  ];

  return (
    <div className="contact-info-card">
      <h2 className="contact-info-title">Averigua Más de Nosotros</h2>
      <p className="contact-info-description">
        Contamos con estos otros medios por donde nos podrás encontrar
      </p>

      <div className="contact-links-list">
        {contactLinks.map((link, index) => {
          if (link.isLink) {
            return (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link-item"
              >
                <Image
                  src={link.icon}
                  alt={link.text}
                  width={50}
                  height={50}
                />
                <span className="contact-link-text">{link.text}</span>
              </a>
            );
          } else {
            return (
              <div key={index} className="contact-link-item">
                <Image
                  src={link.icon}
                  alt={link.text}
                  width={50}
                  height={50}
                />
                <span className="contact-link-text">{link.text}</span>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default ContactInfo;