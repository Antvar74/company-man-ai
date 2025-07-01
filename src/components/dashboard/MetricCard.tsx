// Ruta: src/components/dashboard/MetricCard.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Thermometer, Droplets, Gauge, BarChart4, Edit, AlertCircle } from "lucide-react";
import type { LucideProps } from "lucide-react";
import React from "react";

interface MetricCardProps {
  title: string;
  value: string;
  unit: string;
  description: string;
  range: string;
  icon: React.ElementType<LucideProps>;
}

export function MetricCard({ title, value, unit, description, range, icon: Icon }: MetricCardProps) {
  return (
    <Card className="bg-gray-800 border-gray-700 text-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-white">
                <Edit className="h-4 w-4" />
            </Button>
            <Icon className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">{value} <span className="text-2xl text-muted-foreground">{unit}</span></div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        <p className="text-xs text-gray-500 mt-2">Range: {range}</p>
      </CardContent>
    </Card>
  );
}