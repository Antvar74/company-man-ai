// Ruta: src/app/layout.tsx (Versión de Ensamblaje Final)
import type { Metadata } from "next";
import "./globals.css";
import { AppLayout } from "@/components/layout/app-layout";
import { I18nProvider } from "@/contexts/i18n-context";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Company Man AI",
  description: "Apoyo técnico para Company Man",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <body>
        <I18nProvider>
          <AppLayout>
            {children}
          </AppLayout>
          <Toaster />
        </I18nProvider>
      </body>
    </html>
  );
}