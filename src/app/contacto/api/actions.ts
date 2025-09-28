"use server"

export const addToMailingList = async (formData: FormData) => {

    const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || "";

    const nombreCompleto = formData.get("nombreCompleto");
    const telefono = formData.get("telefono");
    const email = formData.get("email");
    const asunto = formData.get("asunto");
    const mensaje = formData.get("mensaje");

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "event": "contacto",
                nombreCompleto,
                telefono,
                email,
                asunto,
                mensaje,
            })
        })
        if (!response.ok) {
            throw new Error("Failed to add to mailing list");
        }

        return {successMessage: "Gracias por contactarnos! Nos pondremos en contacto con usted pronto."};
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return {errorMessage: "Ups! Hubo un error al enviar el formulario. Por favor, intenta de nuevo."};
    }
}