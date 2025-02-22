"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import { Spinner } from "./spinner";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500); // Simulate loading time
    return () => clearTimeout(timer);
  }, [children]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="py-4 px-12 w-full relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-50">
            <Spinner size="lg" />
          </div>
        )}
        <div
          className={
            loading
              ? "opacity-0"
              : "opacity-100 transition-opacity duration-300"
          }
        >
          {children}
        </div>
      </main>
      <Toaster position="top-center" richColors />
    </SidebarProvider>
  );
}
