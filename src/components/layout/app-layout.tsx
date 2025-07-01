// Ruta: src/components/layout/app-layout.tsx (CORREGIDO)
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calculator as CalculatorIcon,
  Brain,
  BookOpen,
  Settings as SettingsIcon, 
  Home
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
// RUTA CORREGIDA: Ya no busca en /ui/
import { EmergencyButton } from "@/components/emergency-button"; 
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { useI18n } from "@/contexts/i18n-context";

const navItemsConfig = [
  { href: "/dashboard", i18nKey: "navigation.myWell", icon: Home },
  { href: "/calculators", i18nKey: "navigation.calculators", icon: CalculatorIcon },
  // ... otros enlaces
  { href: "/settings", i18nKey: "navigation.settings", icon: SettingsIcon },
];

function SidebarNavigation() {
  const pathname = usePathname();
  const { t } = useI18n(); 

  return (
    <SidebarMenu>
      {navItemsConfig.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname.startsWith(item.href)}
            tooltip={{ children: t(item.i18nKey) }}
            className="justify-start"
          >
            <Link href={item.href}>
              <item.icon className="h-5 w-5" />
              <span>{t(item.i18nKey)}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const { t } = useI18n(); 

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <Sidebar>
        <SidebarHeader className="p-4">
          <h1 className="text-xl font-semibold text-primary truncate group-data-[collapsible=icon]:hidden">
            {t('appName')}
          </h1>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarNavigation />
        </SidebarContent>
        <SidebarFooter className="p-2 mt-auto"> 
           <Separator className="my-2"/>
           <div className="text-xs text-muted-foreground p-2 group-data-[collapsible=icon]:hidden text-center">
             © {new Date().getFullYear()} {t('appName')}
           </div>
        </SidebarFooter>
      </Sidebar>
      <div className="flex flex-col h-screen">
        <header className="sticky top-0 z-10 flex h-14 items-center justify-end gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:hidden">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <SidebarTrigger />
          </div>
          <h1 className="text-lg font-semibold text-primary">{t('appName')}</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-screen-2xl">
            {children}
          </div>
        </main>
      </div>
      <EmergencyButton />
    </SidebarProvider>
  );
}