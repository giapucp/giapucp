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
    
    // Ensure the response body is consumed to prevent Node.js fetch from hanging
    // due to unconsumed streams, which can block the server action.
    await response.text();

    // Remove mode: 'no-cors' so it behaves like the contact action
    // and doesn't hang the Next.js server action
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
