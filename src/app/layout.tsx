import "./globals.css";
import Footer from "@/components/comun/footer/Footer";
import NavbarSwitcher from "@/components/layout/NavbarSwitcher";
import type { Metadata } from "next";
import { Quicksand, Barlow_Condensed, Playfair_Display } from "next/font/google";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.giaperu.space"),
  title: {
    default: "GIA PUCP | Grupo de Investigación Aeroespacial",
    template: "%s | GIA PUCP",
  },
  description:
    "Grupo de Investigación Aeroespacial de la Pontificia Universidad Católica del Perú. Impulsamos proyectos de cohetería experimental, satélites y tecnología espacial desde el Perú.",
  keywords: [
    "GIA PUCP",
    "GIA Perú",
    "Grupo de Investigación Aeroespacial",
    "Aeroespacial Perú",
    "Cohetería experimental",
    "Satélites Perú",
    "PUCP",
    "Kuntur 1",
    "MiSat",
    "LASC",
  ],
  authors: [{ name: "GIA PUCP", url: "https://www.giaperu.space" }],
  creator: "GIA PUCP",
  publisher: "Pontificia Universidad Católica del Perú",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "https://www.giaperu.space",
    siteName: "GIA PUCP",
    title: "GIA PUCP | Grupo de Investigación Aeroespacial",
    description:
      "Impulsamos proyectos de cohetería experimental, satélites y tecnología espacial desde el Perú.",
    images: [
      {
        url: "/logo.png",
        width: 600,
        height: 600,
        alt: "Logo Oficial GIA PUCP",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GIA PUCP | Grupo de Investigación Aeroespacial",
    description:
      "Impulsamos proyectos de cohetería experimental, satélites y tecnología espacial desde el Perú.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${quicksand.variable} ${barlowCondensed.variable} ${playfair.variable}`}
    >
      <body className="min-h-screen flex flex-col font-primary">
        <NavbarSwitcher />
        <main className="flex-1 w-full flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
