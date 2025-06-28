// Ruta: scripts/seed.ts
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, WriteBatch } from 'firebase-admin/firestore';
import * as fs from 'fs';
import * as path from 'path';

// Lee la llave de forma robusta desde la misma carpeta
const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

// Define los datos que vamos a cargar en la base de datos
const dataToSeed = {
  kill_sheet_calcs: {
    name: 'Kill Sheet Calculations',
    labelKey: 'calculators.impCategories.killSheet',
    formulas: [
      { id: 'ks_kwm_imp', titleKey: 'calculators.ks_calcs.kwm.title', iconName: 'ShieldCheck' },
      { id: 'ks_icp_imp', titleKey: 'calculators.ks_calcs.icp.title', iconName: 'Gauge' },
      { id: 'ks_fcp_imp', titleKey: 'calculators.ks_calcs.fcp.title', iconName: 'Gauge' },
    ]
  },
  capacities_volumes: { 
    name: 'Capacities & Volumes',
    labelKey: 'calculators.impCategories.capacitiesVolumes', 
    formulas: [
      { id: 'ohc_imp', titleKey: 'calculators.ohc_imp.title', iconName: 'Container' },
      { id: 'csg_cap_imp', titleKey: 'calculators.csg_cap_imp.title', iconName: 'Container' },
      { id: 'ann_cap_imp', titleKey: 'calculators.ann_cap_imp.title', iconName: 'Layers' },
    ]
  },
  hydraulics: {
    name: 'Hydraulics',
    labelKey: 'calculators.impCategories.hydraulics',
    formulas: [
      { id: 'av_imp', titleKey: 'calculators.av.title', iconName: 'TrendingUp' },
      { id: 'av_po_imp', titleKey: 'calculators.av_po_imp.title', iconName: 'TrendingUp' },
      { id: 'hph_imp', titleKey: 'calculators.hph.title', iconName: 'Bolt' },
    ]
  }
};

// Inicializa la conexión de ADMIN a Firebase
initializeApp({
  credential: cert(serviceAccount) 
});

const db = getFirestore();

async function seedDatabase() {
  console.log('Iniciando la siembra de datos a Firestore...');
  const batch: WriteBatch = db.batch();

  let categoryOrder = 0;
  for (const categoryId in dataToSeed) {
    const categoryData = dataToSeed[categoryId as keyof typeof dataToSeed];
    const categoryDocRef = db.collection('calculadoraCategorias').doc(categoryId);
    batch.set(categoryDocRef, {
      id: categoryId,
      nombre: categoryData.name,
      labelKey: categoryData.labelKey,
      orden: categoryOrder,
    });
    console.log(`Categoría preparada: ${categoryData.name}`);
    categoryOrder++;

    let formulaOrder = 0;
    for (const formula of categoryData.formulas) {
      const formulaDocRef = db.collection('calculadoras').doc(formula.id);
      batch.set(formulaDocRef, {
        id: formula.id,
        categoriaId: categoryId,
        titleKey: formula.titleKey,
        iconName: formula.iconName,
        orden: formulaOrder,
      });
      console.log(`  -> Calculadora preparada: ${formula.titleKey}`);
      formulaOrder++;
    }
  }

  try {
    await batch.commit();
    console.log('\n✅ ¡Éxito! Todos los datos han sido migrados a Firestore.');
  } catch (error) {
    console.error('\n❌ Error al ejecutar la migración:', error);
  }
}

seedDatabase();