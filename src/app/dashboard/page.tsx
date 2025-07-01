// Ruta: src/app/dashboard/page.tsx
"use client";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Thermometer, Droplets, Gauge, BarChart4 } from "lucide-react";

export default function DashboardPage() {
  return (
    <div>
      {/* Aquí añadiremos la cabecera del dashboard más adelante */}
      <h1 className="text-2xl font-bold mb-6">Parámetros Actuales</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard 
          title="Densidad de Lodo"
          value="0.00"
          unit="ppg"
          description="Current Mud Density"
          range="6.68 - 20.86 ppg"
          icon={Droplets}
        />
        <MetricCard 
          title="Temperatura"
          value="0.0"
          unit="°F"
          description="Bottom Hole Temp"
          range="0.0 - 250.0 °F"
          icon={Thermometer}
        />
        <MetricCard 
          title="Presión"
          value="0"
          unit="psi"
          description="Annular Pressure"
          range="0 - 5000 psi"
          icon={Gauge}
        />
        <MetricCard 
          title="ROP"
          value="0.0"
          unit="ft/hr"
          description="Rate of Penetration"
          range="0.0 - 100.0 ft/hr"
          icon={BarChart4}
        />
      </div>

      {/* Aquí añadiremos el resto de los componentes del dashboard */}
    </div>
  );
}