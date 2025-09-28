"use client";
import Navbar from "@/components/comun/navbar/Navbar";
import NavbarAnimado from "@/app/(inicio)/components/navbar/NavbarAnimado";
import { usePathname } from "next/navigation";

export default function NavbarSwitcher() {
  const pathname = usePathname();
  return pathname === "/" ? <NavbarAnimado /> : <Navbar />;
}
