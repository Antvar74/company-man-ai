"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// Ruta: scripts/seed.ts
var app_1 = require("firebase-admin/app");
var firestore_1 = require("firebase-admin/firestore");
var fs = require("fs");
var path = require("path");
// Lee la llave de forma robusta desde la misma carpeta
var serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');
var serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
// Define los datos que vamos a cargar en la base de datos
var dataToSeed = {
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
(0, app_1.initializeApp)({
    credential: (0, app_1.cert)(serviceAccount)
});
var db = (0, firestore_1.getFirestore)();
function seedDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var batch, categoryOrder, categoryId, categoryData, categoryDocRef, formulaOrder, _i, _a, formula, formulaDocRef, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log('Iniciando la siembra de datos a Firestore...');
                    batch = db.batch();
                    categoryOrder = 0;
                    for (categoryId in dataToSeed) {
                        categoryData = dataToSeed[categoryId];
                        categoryDocRef = db.collection('calculadoraCategorias').doc(categoryId);
                        batch.set(categoryDocRef, {
                            id: categoryId,
                            nombre: categoryData.name,
                            labelKey: categoryData.labelKey,
                            orden: categoryOrder,
                        });
                        console.log("Categor\u00EDa preparada: ".concat(categoryData.name));
                        categoryOrder++;
                        formulaOrder = 0;
                        for (_i = 0, _a = categoryData.formulas; _i < _a.length; _i++) {
                            formula = _a[_i];
                            formulaDocRef = db.collection('calculadoras').doc(formula.id);
                            batch.set(formulaDocRef, {
                                id: formula.id,
                                categoriaId: categoryId,
                                titleKey: formula.titleKey,
                                iconName: formula.iconName,
                                orden: formulaOrder,
                            });
                            console.log("  -> Calculadora preparada: ".concat(formula.titleKey));
                            formulaOrder++;
                        }
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, batch.commit()];
                case 2:
                    _b.sent();
                    console.log('\n✅ ¡Éxito! Todos los datos han sido migrados a Firestore.');
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    console.error('\n❌ Error al ejecutar la migración:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
seedDatabase();
