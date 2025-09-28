export type MiembroResponse = {
	id: string | number;
	Nombres?: string;
	ApellidoPaterno?: string;
	foto?: {
		data?: {
			attributes?: {
				url?: string;
			};
		};
	};
	area_gia?: {
		id: string | number;
		NombreArea?: string;
	};
};

export type Miembro = {
	id: string | number;
	nombre: string;
	apellidoPaterno: string;
	foto: string;
	area: {
		id: string | number;
		nombre: string;
	};
};
