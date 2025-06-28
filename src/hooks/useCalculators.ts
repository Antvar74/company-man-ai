// Ruta: src/hooks/useCalculators.ts
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, DocumentData } from 'firebase/firestore';

export interface Calculadora extends DocumentData {
  id: string;
  titleKey: string;
  iconName: string;
  categoriaId: string;
}

export interface Categoria extends DocumentData {
  id: string;
  nombre: string;
  labelKey: string;
  calculadoras: Calculadora[];
}

export function useCalculators() {
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [categorySnapshot, calculatorSnapshot] = await Promise.all([
          getDocs(query(collection(db, "calculadoraCategorias"), orderBy("orden"))),
          getDocs(query(collection(db, "calculadoras"), orderBy("orden")))
        ]);

        const calculatorsMap = new Map<string, Calculadora[]>();
        calculatorSnapshot.forEach(doc => {
          const calc = doc.data() as Calculadora;
          if (!calculatorsMap.has(calc.categoriaId)) {
            calculatorsMap.set(calc.categoriaId, []);
          }
          calculatorsMap.get(calc.categoriaId)!.push(calc);
        });

        const structuredCategories = categorySnapshot.docs.map(doc => {
          const categoryData = doc.data();
          const categoryId = categoryData.id;

          return {
            ...categoryData,
            calculadoras: calculatorsMap.get(categoryId) || [] 
          } as Categoria;
        });

        setCategories(structuredCategories);

      } catch (err) {
        setError(err instanceof Error ? err : new Error('Ocurrió un error desconocido'));
        console.error("Error al obtener los datos de las calculadoras:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { categories, isLoading, error };
}