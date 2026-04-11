import { Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";

export const ContactInfo = () => {
  const contactLinks = [
    {
      icon: <Instagram size={28} className="text-gray-700 group-hover:text-[#E1306C] transition-colors" />,
      text: "@gia_pucp",
      href: "https://www.instagram.com/gia_pucp",
      isLink: true,
    },
    {
      icon: <Linkedin size={28} className="text-gray-700 group-hover:text-[#0077b5] transition-colors" />,
      text: "GIA PUCP",
      href: "https://www.linkedin.com/company/gia-at-pucp",
      isLink: true,
    },
    {
      icon: <Mail size={28} className="text-gray-700 group-hover:text-[#ea4335] transition-colors" />,
      text: "grupo.gia@pucp.edu.pe",
      isLink: false,
    },
    {
      icon: <MessageCircle size={28} className="text-gray-700 group-hover:text-[#25D366] transition-colors" />,
      text: "+51 963 065 928",
      href: "https://wa.me/51963065928",
      isLink: true,
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-center font-bold text-2xl mb-2 text-gray-900 uppercase tracking-wide">Averigua Más</h3>
      <p className="text-center text-gray-500 mb-8 text-sm">
        Contamos con estos otros medios por donde nos podrás encontrar
      </p>

      <div className="flex flex-col gap-4 flex-grow">
        {contactLinks.map((link, index) => {
          if (link.isLink) {
            return (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-start gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200 hover:border-gray-300 shadow-sm transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 group-hover:shadow-md transition-shadow">
                  {link.icon}
                </div>
                <span className="font-medium text-gray-700 group-hover:text-gray-900">{link.text}</span>
              </a>
            );
          } else {
            return (
              <div 
                key={index} 
                className="group flex items-center justify-start gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200 hover:border-gray-300 shadow-sm transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 group-hover:shadow-md transition-shadow">
                  {link.icon}
                </div>
                <span className="font-medium text-gray-700 group-hover:text-gray-900">{link.text}</span>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default ContactInfo;