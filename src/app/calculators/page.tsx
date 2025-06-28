// Ruta: src/app/calculators/page.tsx

"use client";

import React, { useState, useMemo } from "react";
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Repeat, Sigma, BookCopy, ListChecks, Loader2, AlertCircle as AlertCircleIcon } from "lucide-react";
import { useI18n } from "@/contexts/i18n-context";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUnitPreferences } from "@/contexts/unit-preferences-context";
import { Button } from "@/components/ui/button";
import TechnicalTablesViewer from "@/components/technical-tables/TechnicalTablesViewer";
import { useCalculators } from '@/hooks/useCalculators';
import { calculatorRegistry } from '@/lib/calculators/registry';
import { iconRegistry } from '@/lib/icons/registry';
import type { LucideIcon } from 'lucide-react';

// Asegúrate de tener los componentes que usan las otras pestañas
const WellControlSheet = dynamic(() => import('@/components/calculators/sheets/WellControlSheet'));
// ... etc

export default function CalculatorsPage() {
  const { t } = useI18n();
  // NOTA: La lógica para las pestañas de Conversión y Métrico está ausente
  // porque la estamos reconstruyendo. Nos enfocaremos en la Imperial primero.
  // Más tarde, podemos restaurar la lógica de tus backups.

  // --- State y Lógica para Fórmulas IMPERIAL ---
  const { categories, isLoading: isImperialLoading, error: imperialError } = useCalculators();
  const [selectedImperialCategoryId, setSelectedImperialCategoryId] = useState<string | null>(null);
  const [activeImperialFormulaId, setActiveImperialFormulaId] = useState<string>('');
  
  const handleImperialCategoryChange = (categoryId: string) => {
    setSelectedImperialCategoryId(categoryId);
    setActiveImperialFormulaId('');
  };

  const imperialCalculatorsToDisplay = useMemo(() => {
    if (!selectedImperialCategoryId) return [];
    const category = categories.find(c => c.id === selectedImperialCategoryId);
    return category ? category.calculadoras : [];
  }, [selectedImperialCategoryId, categories]);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Calculadoras de Perforación</h1>
      </div>

      <Tabs defaultValue="formulas_imperial" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="conversion" disabled>Conversión</TabsTrigger>
            <TabsTrigger value="formulas" disabled>Fórmulas Sistema Métrico</TabsTrigger>
            <TabsTrigger value="formulas_imperial"><Sigma className="h-4 w-4 mr-2"/>Fórmulas Sistema Inglés</TabsTrigger>
            <TabsTrigger value="wellControlSheet" disabled>Hoja de Control</TabsTrigger>
            <TabsTrigger value="techTables" disabled>Tablas Técnicas</TabsTrigger>
        </TabsList>

        <TabsContent value="formulas_imperial" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Imperial System Formulas</CardTitle>
              <CardDescription>Select a category to view the relevant formula-based calculators in imperial units. This data is loaded dynamically.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isImperialLoading && (
                <div className="flex items-center justify-center py-10">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="ml-2">Cargando datos desde la base de datos...</p>
                </div>
              )}
              {imperialError && (
                  <div className="flex items-center justify-center py-10 text-destructive">
                    <AlertCircleIcon className="h-8 w-8 mr-2" />
                    <p className="font-bold">Error: {imperialError.message}</p>
                  </div>
              )}
              {!isImperialLoading && !imperialError && categories && (
                <>
                  <div>
                    <Label htmlFor="imperial-category-select">Categoría</Label>
                    <Select value={selectedImperialCategoryId || ''} onValueChange={handleImperialCategoryChange}>
                      <SelectTrigger id="imperial-category-select" className="w-full md:w-[350px]">
                        <SelectValue placeholder="Selecciona una categoría..." />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {selectedImperialCategoryId && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
                      {imperialCalculatorsToDisplay.map(calc => {
                        const IconComponent = iconRegistry[calc.iconName as keyof typeof iconRegistry] || Sigma;
                        return (
                          <Card 
                            key={calc.id} 
                            onClick={() => setActiveImperialFormulaId(calc.id)}
                            className={`cursor-pointer transition-all ${activeImperialFormulaId === calc.id ? 'border-primary shadow-lg' : 'hover:shadow-md'}`}
                          >
                            <CardHeader className="flex flex-row items-center gap-4 space-y-0 p-4">
                              <IconComponent className="h-8 w-8 text-primary" />
                              <CardTitle className="text-sm font-medium">
                                {calc.titleKey}
                              </CardTitle>
                            </CardHeader>
                          </Card>
                        );
                      })}
                    </div>
                  )}

                  {activeImperialFormulaId && (() => {
                      const ActiveCalculatorComponent = calculatorRegistry[activeImperialFormulaId as keyof typeof calculatorRegistry];
                      if (!ActiveCalculatorComponent) {
                         console.error(`Componente no encontrado en el registro para el id: ${activeImperialFormulaId}`);
                         return <div className="text-red-500">Error: Componente no registrado.</div>;
                      }
                      
                      return (
                        <div className="mt-6 pt-6 border-t">
                            <ActiveCalculatorComponent />
                        </div>
                      );
                  })()}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}