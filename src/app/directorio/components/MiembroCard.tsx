import "./MiembroCard.css";
import Image from "next/image";

type MiembroCardProps = {
  imagenSrc: string;
  nombre: string;
  apellido: string;
  cargo: {
    nombre: string;
  };
};

const MiembroCard: React.FC<MiembroCardProps> = ({ 
  imagenSrc, 
  nombre, 
  apellido, 
  cargo 
}) => {
  return (
    <div className="miembro-card">
      <div className="miembro-imagen-container">
        <Image
          src={imagenSrc || "/placeholder.jpg"}
          alt={`Foto de ${nombre} ${apellido}`}
          className="miembro-imagen"
          width={150}
          height={150}
          onError={(e) => {
            e.currentTarget.src = "/placeholder.jpg";
          }}
        />
      </div>
      <div className="miembro-nombre">
        {nombre} {apellido}
      </div>
      {cargo.nombre && cargo.nombre !== "Sin cargo" && (
        <p className="miembro-cargo">{cargo.nombre}</p>
      )}
    </div>
  );
};

export default MiembroCard;