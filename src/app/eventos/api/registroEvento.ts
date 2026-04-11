"use server"

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_EVENTOS_URL || "";
export interface RegistroEventoData {
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  eventoNombre: string;
}

export interface RegistroResponse {
  success: boolean;
  message: string;
}

export async function registrarAsistente(data: RegistroEventoData): Promise<RegistroResponse> {
  if (!GOOGLE_SCRIPT_URL) {
    console.error("GOOGLE_SCRIPT_EVENTOS_URL no está configurada");
    return {
      success: false,
      message: "Error de configuración del servidor. Contacta al administrador.",
    };
  }

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: data.nombre,
        apellido: data.apellido,
        fechaNacimiento: data.fechaNacimiento,
        eventoNombre: data.eventoNombre,
      }),
    });

    // Con mode: "no-cors" no podemos leer la respuesta,
    // pero si no hubo excepción, asumimos éxito
    return {
      success: true,
      message: "¡Registro exitoso! Te esperamos en el evento.",
    };
  } catch (error) {
    console.error("Error registrando asistente:", error);
    return {
      success: false,
      message: "Error al registrarse. Intenta nuevamente.",
    };
  }
}
