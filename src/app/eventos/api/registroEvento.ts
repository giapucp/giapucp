"use server"

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_EVENTOS_URL || "";

export interface RegistroEventoData {
  nombre: string;
  apellido?: string;
  fechaNacimiento?: string;
  area?: string;
  eventoNombre: string;
  correo: string;
  institucion: string;
  institucionOtro?: string;
  aceptaPublicidad: string;
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

  // 🛡️ TRUCO DE SEGURIDAD: Creamos un controlador para abortar la petición si tarda demasiado
  const controller = new AbortController();
  // Si pasan 8 segundos y Google no responde, se cancela la petición automáticamente
  const timeoutId = setTimeout(() => controller.abort(), 8000); 

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      signal: controller.signal, // <-- Conectamos el detector de timeout al fetch
      body: JSON.stringify({
        nombre: data.nombre,
        apellido: data.apellido || "",
        fechaNacimiento: data.fechaNacimiento || "",
        area: data.area || "",
        eventoNombre: data.eventoNombre,
        correo: data.correo,
        institucion: data.institucion,
        institucionOtro: data.institucionOtro || "",
        aceptaPublicidad: data.aceptaPublicidad,
      }),
    });
    
    // Si la respuesta llegó antes de los 8 segundos, limpiamos el temporizador
    clearTimeout(timeoutId);

    // Consumimos el cuerpo de la respuesta de manera segura para cerrar el stream de Node.js
    await response.text();

    if (!response.ok) {
      throw new Error(`Google Apps Script respondió con estatus: ${response.status}`);
    }

    return {
      success: true,
      message: "¡Registro exitoso! Te esperamos en el evento.",
    };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Nos aseguramos de limpiar el temporizador si ocurre cualquier otro error de red
    clearTimeout(timeoutId); 

    // 🚨 Detectamos si el error fue causado por nuestro límite de tiempo (Timeout)
    if (error.name === 'AbortError') {
      console.error("Error: El servidor de Google Sheets tardó más de 8 segundos y fue abortado.");
      return {
        success: false,
        message: "El servidor de registro está muy lento en este momento. Por favor, intenta de nuevo.",
      };
    }

    console.error("Error registrando asistente:", error);
    return {
      success: false,
      message: "Error al registrarse. Intenta nuevamente.",
    };
  }
}
