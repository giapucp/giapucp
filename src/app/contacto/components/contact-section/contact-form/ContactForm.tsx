"use client"

import { FormEvent, useState } from "react"
import { addToMailingList } from "@/app/contacto/api/actions"
import Image from "next/image"
import "./ContactForm.css"

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
                <div className="success-message">
                    <h3>Su mensaje ha sido enviado con éxito :)</h3>
                    <p>{submitSuccess}</p>
                    <Image 
                        src="/success-icon.png" 
                        alt="Success" 
                        width={100} 
                        height={100} />
                </div>
            )}
            {submitError && (
                <div className="error-message">
                    <h3>Su mensaje no pudo ser enviado :(</h3>
                    {submitError}
                    <Image 
                        src="/error-icon.png" 
                        alt="Error" 
                        width={100} 
                        height={100} />
                </div>
            )}
            {!submitSuccess && !submitError && (
                <form 
                className="contact-form-container"
                onSubmit={(e) => handleRegister(e)}
                >
                    <h2 className="contact-form-title font-display">Envíanos un mensaje</h2>
                    <div className="form-field-container">
                        <label htmlFor="fullName" className="form-field-label">Nombre Completo</label>
                        <input 
                            type="text" 
                            id="nombreCompleto"
                            name="nombreCompleto" 
                            placeholder="Nombre Completo" 
                            className="form-field-input"
                            required 
                        />
                    </div>
                    <div className="form-field-container">
                        <label htmlFor="telefono" className="form-field-label">Teléfono</label>
                        <input 
                            type="tel" 
                            id="telefono"
                            name="telefono"
                            placeholder="Teléfono" 
                            className="form-field-input"
                            required
                        />
                    </div>
                    <div className="form-field-container">
                        <label htmlFor="email" className="form-field-label">Email</label>
                        <input 
                            type="email" 
                            id="email"
                            name="email" 
                            placeholder="Email" 
                            className="form-field-input"
                            required 
                        />
                    </div>
                    <div className="form-field-container">  
                        <label htmlFor="asunto" className="form-field-label">Asunto</label>
                        <select 
                            defaultValue="" 
                            id="asunto"
                            name="asunto" 
                            className="form-field-textarea"
                            required
                        >
                            <option value="" disabled hidden>Escoja una opción</option>
                            <option value="Ser colaborador de GIA">Ser colaborador de GIA</option>
                            <option value="Propuesta de Proyecto">Propuesta de Proyecto</option>
                            <option value="Consulta sobre artículo">Consulta sobre artículo</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>
                    <div className="form-field-container">
                        <label htmlFor="mensaje" className="form-field-label">Mensaje</label>
                        <textarea
                            id="mensaje"
                            name="mensaje"
                            placeholder="Mensaje"
                            className="form-field-textarea"
                            rows={4}
                            required
                        />
                    </div>
                    <button 
                        className="submit-button" 
                        disabled={isPending}>{isPending ? "Procesando..." : "Enviar"}
                    </button>
                </form>
            )}
        </>
    )
}