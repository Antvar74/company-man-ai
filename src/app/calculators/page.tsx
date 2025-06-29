// Ruta: src/app/calculators/page.tsx (Versión de Prueba Final)

"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, AlertCircle as AlertCircleIcon, Sigma } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCalculators } from '@/hooks/useCalculators';
import { calculatorRegistry } from '@/lib/calculators/registry';
import { iconRegistry } from '@/lib/icons/registry';
import type { LucideIcon } from 'lucide-react';

export default function CalculatorsPage() {
  const { categories, isLoading, error } = useCalculators();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [activeFormulaId, setActiveFormulaId] = useState<string>('');
  
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setActiveFormulaId('');
  };

  const calculatorsToDisplay = useMemo(() => {
    if (!selectedCategoryId) return [];
    const category = categories.find(c => c.id === selectedCategoryId);
    return category ? category.calculadoras : [];
  }, [selectedCategoryId, categories]);

  // Ya no necesitamos el ActiveCalculatorComponent por ahora

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Calculadoras de Perforación</h1>

      <Card>
        <CardHeader>
          <CardTitle>Imperial System Formulas</CardTitle>
          <CardDescription>Select a category to view the relevant formula-based calculators in imperial units.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading && ( <div className="flex items-center justify-center py-10"><Loader2 className="h-8 w-8 animate-spin text-primary" /><p className="ml-2">Cargando datos...</p></div> )}
          {error && ( <div className="flex items-center justify-center py-10 text-destructive"><AlertCircleIcon className="h-8 w-8 mr-2" /><p className="font-bold">Error: {error.message}</p></div> )}
          
          {!isLoading && !error && (
            <>
              <div>
                <Label htmlFor="category-select">Categoría</Label>
                <Select value={selectedCategoryId || ''} onValueChange={handleCategoryChange}>
                  <SelectTrigger id="category-select" className="w-full md:w-[350px]">
                    <SelectValue placeholder="Selecciona una categoría..." />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => ( <SelectItem key={category.id} value={category.id}>{category.nombre}</SelectItem> ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedCategoryId && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
                  {calculatorsToDisplay.map(calc => {
                    const IconComponent = iconRegistry[calc.iconName as keyof typeof iconRegistry] || Sigma;
                    return (
                      <Card 
                        key={calc.id} 
                        // CAMBIO CLAVE: Ahora solo mostramos un mensaje en la consola
                        onClick={() => {
                          console.log("Calculadora seleccionada:", calc.id);
                          setActiveFormulaId(calc.id);
                        }}
                        className={`cursor-pointer transition-all ${activeFormulaId === calc.id ? 'border-primary shadow-lg' : 'hover:shadow-md'}`}
                      >
                        <CardHeader className="flex flex-row items-center gap-4 space-y-0 p-4">
                          <IconComponent className="h-8 w-8 text-primary" />
                          <CardTitle className="text-sm font-medium">{calc.titleKey}</CardTitle>
                        </CardHeader>
                      </Card>
                    );
                  })}
                </div>
              )}

              {/* CAMBIO CLAVE: Mostramos solo un texto en lugar del componente */}
              {activeFormulaId && (
                <div className="mt-6 pt-6 border-t">
                    <p className="text-green-500 font-bold">Éxito: Se mostraría la calculadora para '{activeFormulaId}'</p>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}