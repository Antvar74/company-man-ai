// Ruta: src/lib/translations.ts
export type Language = 'en' | 'es' | 'pt' | 'fr';

export interface NestedTranslation {
  [key: string]: string | NestedTranslation;
}

export interface Translations {
  en: NestedTranslation;
  es: NestedTranslation;
  pt?: NestedTranslation;
  fr?: NestedTranslation;
}

export type TranslationKey = string;

export const translations: Translations = {
  en: {
    appName: "OilField Pro",
    navigation: {
      myWell: "My Well",
      calculators: "Calculators",
      aiAssistant: "AI Assistant",
      inspectionCapture: "Inspect",
      knowledgeBase: "Knowledge",
      dataManagement: "Data Mgmt",
      wellProgram: "Well Program",
      smartLogistics: "Logistics",
      reports: "Reports",
      technicalTables: "Tech Tables",
      fieldOps: "Field Ops",
      settings: "Settings",
      bhaManagement: "BHA Design",
    },
    // ... (y todo el resto del contenido del archivo que me enviaste) ...
  },
  es: {
    appName: "OilField Pro",
    navigation: {
      myWell: "Mi Pozo",
      calculators: "Calculadoras",
      // ... (y todo el resto de las traducciones al español) ...
    },
  },
};