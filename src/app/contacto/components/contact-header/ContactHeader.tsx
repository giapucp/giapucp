import "./ContactHeader.css";

const ContactHeader = () => {
  return (
    <div className="">
      <div className="container-content">
        <div className="animated-header-content">
          <h1 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-6">
            Contáctanos
          </h1>
          <p className="text-lg font-bold md:text-xl text-black">
            Si desea comunicarse con nosotros lo puede realizar por estos medios
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactHeader;
