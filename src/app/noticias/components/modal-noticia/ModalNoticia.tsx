"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import React, { useEffect } from "react";
import Image from "next/image";
import "./ModalNoticia.css";
import { Noticia } from "@/app/(inicio)/types/types";

interface ModalNoticiaProps {
	noticia: Noticia;
	onClose: () => void;
}

const ModalNoticia: React.FC<ModalNoticiaProps> = ({ noticia, onClose }) => {
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [onClose]);

	return (
		<div className="modal-noticia-overlay" onClick={onClose}>
			<div
				className={`modal-noticia-container ${noticia ? "show" : ""}`}
				onClick={(e) => e.stopPropagation()}
				tabIndex={0}
				role="dialog"
				aria-modal="true"
			>
				<button className="modal-noticia-close" onClick={onClose} aria-label="Cerrar">
					&times;
				</button>
				<div className="modal-noticia-header">
					<Image
						src={noticia.portada || "/placeholder.jpg"}
						alt={noticia.titulo || "Noticia"}
						className="modal-noticia-image"
						width={500}
						height={300}
						loading="lazy"
						unoptimized={true}
					/>
					<div className="modal-noticia-gradient"></div>
					<h2 className="modal-noticia-title">{noticia.titulo}</h2>
				</div>
				<div className="modal-noticia-content">
					<p className="modal-noticia-date">
						{noticia.fechaPublicacion || "Fecha no disponible"}
					</p>
					
					<div className="modal-noticia-body">
						{noticia.contenido ? (
							<ReactMarkdown remarkPlugins={[remarkGfm]}>
								{noticia.contenido}
							</ReactMarkdown>
						) : null}
					</div>
					<p className="modal-noticia-summary">
						{noticia.textoFinal || "Resumen no disponible"}
					</p>
				</div>
			</div>
		</div>
	);
};

export default ModalNoticia;
