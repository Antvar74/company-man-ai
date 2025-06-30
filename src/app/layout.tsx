// Ruta: src/app/layout.tsx (Versión Final con Layout y Providers)
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppLayout } from "@/components/layout/app-layout";
import { I18nProvider } from "@/contexts/i18n-context";
import { Toaster } from "@/components/ui/toaster"; // Importamos el Toaster

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
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