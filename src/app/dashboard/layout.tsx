// app/dashboard/layout.tsx
"use client"
import { SidebarProvider } from "@/contexts/sidebar";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import Header from "@/components/dashboard/headers/Header";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <SidebarProvider>
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex flex-col flex-1">
            <Header />
            <main className="p-4">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </SessionProvider>
  );
}
