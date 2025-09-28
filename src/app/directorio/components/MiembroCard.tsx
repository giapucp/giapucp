import "./MiembroCard.css";
import Image from "next/image";

type MiembroCardProps = {
	imagenSrc: string;
	nombre: string;
	apellido: string;
};

const MiembroCard: React.FC<MiembroCardProps> = ({ imagenSrc, nombre, apellido }) => {
	return (
		<div className="miembro-card">
			<div className="miembro-imagen-container">
				<Image
					src={imagenSrc || "/placeholder.jpg"}
					alt={`Foto de ${nombre}`}
					className="miembro-imagen"
					width={100}
					height={100}
				/>
			</div>
			<h3 className="miembro-nombre">
				{nombre} {apellido}
			</h3>
		</div>
	);
};

export default MiembroCard;
