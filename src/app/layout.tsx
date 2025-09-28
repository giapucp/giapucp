import "./globals.css";
import Footer from "@/components/comun/footer/Footer";
import NavbarSwitcher from "@/components/layout/NavbarSwitcher";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GIA PUCP",
  description: "Impulsando el desarrollo de proyectos aeroespaciales en el Perú. Grupo fundado en la Pontificia Universidad Católica del Perú.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`min-h-screen flex flex-col`}>
        <NavbarSwitcher/>
        <main className="flex-1 w-full flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
