"use client"

import { FormEvent, useState } from "react"
import { addToMailingList } from "@/app/contacto/api/actions"
import { CheckCircle2, XCircle } from "lucide-react"

export const ContactForm = () => {

    const [isPending, setIsPending] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState("")
    const [submitError, setSubmitError] = useState("")

    const handleRegister = async (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        setIsPending(true);
        const formData = new FormData(e.target as HTMLFormElement);
        const res = await addToMailingList(formData);
        if(res.successMessage){
            setSubmitSuccess(res.successMessage);
        } else {
            setSubmitError(res.errorMessage || "");
        }
        setIsPending(false);
    }

    return(
        <>
            {submitSuccess && (
                <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-50 border border-gray-200 rounded-2xl">
                    <CheckCircle2 size={80} className="text-green-500 mb-6" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Su mensaje ha sido enviado con éxito :)</h3>
                    <p className="text-gray-600">{submitSuccess}</p>
                </div>
            )}
            
            {submitError && (
                <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-50 border border-gray-200 rounded-2xl">
                    <XCircle size={80} className="text-red-500 mb-6" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Su mensaje no pudo ser enviado :(</h3>
                    <p className="text-gray-600">{submitError}</p>
                </div>
            )}
            
            {!submitSuccess && !submitError && (
                <form 
                  className="flex flex-col gap-5 w-full bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm"
                  onSubmit={(e) => handleRegister(e)}
                >
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="nombreCompleto" className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Nombre Completo</label>
                        <input 
                            type="text" 
                            id="nombreCompleto"
                            name="nombreCompleto" 
                            placeholder="Ej. Juan Pérez" 
                            className="px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-[#00548c] focus:ring-2 focus:ring-[#00548c]/20 transition-all font-medium"
                            required 
                        />
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="telefono" className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Teléfono</label>
                        <input 
                            type="tel" 
                            id="telefono"
                            name="telefono"
                            placeholder="Ej. 987654321" 
                            className="px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-[#00548c] focus:ring-2 focus:ring-[#00548c]/20 transition-all font-medium"
                            required
                        />
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Email</label>
                        <input 
                            type="email" 
                            id="email"
                            name="email" 
                            placeholder="correo@ejemplo.com" 
                            className="px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-[#00548c] focus:ring-2 focus:ring-[#00548c]/20 transition-all font-medium"
                            required 
                        />
                    </div>
                    
                    <div className="flex flex-col gap-1.5">  
                        <label htmlFor="asunto" className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Asunto</label>
                        <select 
                            defaultValue="" 
                            id="asunto"
                            name="asunto" 
                            className="px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-[#00548c] focus:ring-2 focus:ring-[#00548c]/20 transition-all font-medium appearance-none cursor-pointer"
                            required
                        >
                            <option value="" disabled hidden>Escoja una opción</option>
                            <option value="Ser colaborador de GIA">Ser colaborador de GIA</option>
                            <option value="Propuesta de Proyecto">Propuesta de Proyecto</option>
                            <option value="Consulta sobre artículo">Consulta sobre artículo</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="mensaje" className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Mensaje</label>
                        <textarea
                            id="mensaje"
                            name="mensaje"
                            placeholder="Escribe tu mensaje aquí..."
                            className="px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-[#00548c] focus:ring-2 focus:ring-[#00548c]/20 transition-all font-medium resize-none"
                            rows={4}
                            required
                        />
                    </div>
                    
                    <button 
                        className="mt-4 w-full py-4 bg-[#00548c] hover:bg-[#003d66] text-white font-bold rounded-xl shadow-md transition-colors disabled:opacity-70 flex justify-center items-center" 
                        disabled={isPending}
                    >
                        {isPending ? "Enviando mensaje..." : "Enviar Mensaje"}
                    </button>
                </form>
            )}
        </>
    )
}