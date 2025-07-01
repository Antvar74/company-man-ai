// Ruta: src/components/emergency-button.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
// import { EmergencyMode } from "./emergency-mode"; // Nota: Este componente aún no lo tenemos, lo crearemos después.
import { useToast } from "@/hooks/use-toast";

type RiskLevel = "NONE" | "INFO" | "WARNING" | "CRITICAL";
const EMERGENCY_COOLDOWN_PERIOD = 3600000;

const simulateSystemStatus = (): { riskScore: number; operationsCount: number; criticalParametersCount: number } => {
  // Lógica de simulación... (la he omitido por brevedad)
  return { riskScore: 50, operationsCount: 1, criticalParametersCount: 1 }; // Ejemplo
};

export function EmergencyButton() {
  const isMobile = useIsMobile();
  const [isEmergencyModeActive, setIsEmergencyModeActive] = useState(false);
  const { toast } = useToast(); 
  const [riskScore, setRiskScore] = useState(0);
  const [operationsCount, setOperationsCount] = useState(0);
  const [criticalParametersCount, setCriticalParametersCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [currentRiskLevel, setCurrentRiskLevel] = useState<RiskLevel>("NONE");
  const [hasMounted, setHasMounted] = useState(false);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => { setHasMounted(true); }, []);

  useEffect(() => {
    if (!hasMounted) return; 
    // ... Lógica del useEffect (la he omitido por brevedad) ...
    setIsVisible(true); // Forzamos a que sea visible para la prueba
    setCurrentRiskLevel("WARNING"); // Forzamos un estado para la prueba
  }, [hasMounted]); 

  const activateEmergencyMode = () => {
    setIsEmergencyModeActive(true);
  };

  const deactivateEmergencyMode = () => {
    setIsEmergencyModeActive(false);
  };

  if (!hasMounted) return null; 

  if (isEmergencyModeActive) {
    // Por ahora, solo mostramos un placeholder del modo emergencia
    return (
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
         <div className="bg-gray-800 p-8 rounded-lg text-white">
            <h2 className="text-2xl font-bold text-red-500 mb-4">MODO EMERGENCIA (Placeholder)</h2>
            <Button onClick={deactivateEmergencyMode}>Desactivar</Button>
         </div>
      </div>
    );
  }

  if (!isVisible) return null; 

  const bottomOffsetClass = isMobile ? "bottom-[5.5rem]" : "bottom-6"; 

  const buttonBgColor = 
    currentRiskLevel === "CRITICAL" ? "bg-destructive hover:bg-destructive/90" :
    currentRiskLevel === "WARNING" ? "bg-yellow-500 hover:bg-yellow-600" :
    "bg-primary hover:bg-primary/90"; 

  return (
    <Button
      variant="default" 
      size="lg"
      className={cn( "fixed right-4 md:right-6 h-16 w-16 rounded-full shadow-2xl z-50 text-white", buttonBgColor, currentRiskLevel === "CRITICAL" && "animate-pulse", bottomOffsetClass )}
      onClick={activateEmergencyMode}
    >
      <AlertTriangle className="h-8 w-8" />
    </Button>
  );
}