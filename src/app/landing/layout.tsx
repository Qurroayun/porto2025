// src/app/(landing)/layout.tsx
import { ReactNode } from "react";
import Navbar from "@/components/landing/navbar/navbar";
import { ThemeProvider } from "@/components/providers/theme-provider";

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Navbar />
      <main className="container mx-auto">{children}</main>
    </ThemeProvider>
  );
}
