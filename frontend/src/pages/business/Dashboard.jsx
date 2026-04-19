import { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useTheme } from "../../context/ThemeContext";
import SidebarBusiness from "../../components/SidebarBusiness";
import api from "../../api/axios";

function DashboardBusiness() {
  const { dark } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [exporting, setExporting] = useState(false);

  const handleExportExcel = async () => {
    setExporting(true);
    try {
      // Récupérer les données depuis Oracle
      const [alertesRes, fournisseursRes, servicesRes] = await Promise.all([
        api.get("/api/alertes"),
        api.get("/api/fournisseurs"),
        api.get("/api/services"),
      ]);

      const workbook = XLSX.utils.book_new();

      // Feuille Alertes
      const alertesData = alertesRes.data.map((a) => ({
        ID: a.ID,
        Date: a.START_DATE,
        Service: a.NOM_SERVICE,
        SC: a.SC,
        Keyword: a.KEYWORD,
        Fournisseur: a.NOM_FOURNISSEUR,
        "Augmentation (%)": a.AUGMENTATION,
        "Nb SMS": a.COUNT_NB_SMS,
        Motif: a.MOTIF,
        Statut: a.STATUS === 0 ? "Non lu" : a.STATUS === 1 ? "Lu" : "Non fait",
      }));
      const alertesSheet = XLSX.utils.json_to_sheet(
        alertesData.length > 0 ? alertesData : [{ "Aucune donnée": "" }],
      );
      XLSX.utils.book_append_sheet(workbook, alertesSheet, "Alertes");

      // Feuille Fournisseurs
      const fournisseursData = fournisseursRes.data.map((f) => ({
        ID: f.ID,
        "Nom fournisseur": f.PROVIDER_NAME,
        Nationalité: f.NATIONALITE,
        "ID Fiscale": f.ID_FISCALE,
        Adresse: f.ADRESSE,
      }));
      const fournisseursSheet = XLSX.utils.json_to_sheet(
        fournisseursData.length > 0
          ? fournisseursData
          : [{ "Aucune donnée": "" }],
      );
      XLSX.utils.book_append_sheet(workbook, fournisseursSheet, "Fournisseurs");

      // Feuille Services SMS+
      const servicesData = servicesRes.data.map((s) => ({
        ID: s.ID,
        Fournisseur: s.NOM_FOURNISSEUR,
        Service: s.NOM_SERVICE,
        "Numéro court": s.NUMERO_COURT,
        Keyword: s.KEYWORD,
        Type: s.TYPE,
        "Prix (DT)": s.PRIX,
        Statut: s.ACTIF === 1 ? "Actif" : "Inactif",
      }));
      const servicesSheet = XLSX.utils.json_to_sheet(
        servicesData.length > 0 ? servicesData : [{ "Aucune donnée": "" }],
      );
      XLSX.utils.book_append_sheet(workbook, servicesSheet, "Services SMS+");

      // Générer et télécharger le fichier
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });
      const date = new Date().toLocaleDateString("fr-FR").replace(/\//g, "-");
      saveAs(blob, `VAS_Monitoring_Export_${date}.xlsx`);
    } catch (error) {
      console.error("Erreur export Excel", error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div
      className={`flex h-screen ${dark ? "bg-slate-900 text-slate-100" : "bg-gray-100 text-gray-800"}`}
    >
      {sidebarOpen && <SidebarBusiness />}

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-6 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg border border-gray-200 dark:border-slate-600 mr-3"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <div>
            <h2 className="text-sm font-medium text-gray-800 dark:text-slate-100">
              Dashboard Business
            </h2>
            <p className="text-xs text-gray-400 dark:text-slate-400">
              Analyse des revenus VAS
            </p>
          </div>
          <button
            onClick={handleExportExcel}
            disabled={exporting}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-white disabled:opacity-50"
            style={{ background: "#16a34a" }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {exporting ? "Export en cours..." : "Exporter Excel"}
          </button>
        </div>

        <div className="p-5 flex-1 overflow-auto">
          {/* Power BI Revenus par mois */}
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100 dark:border-slate-700">
              <p className="text-sm font-medium text-gray-700 dark:text-slate-200">
                Revenus par mois
              </p>
              <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                Power BI
              </span>
            </div>
            <div className="flex items-center justify-center h-48 bg-gray-50 dark:bg-slate-900">
              <div className="text-center">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0066CC"
                  strokeWidth="1.5"
                  className="mx-auto mb-2"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
                <p className="text-xs font-medium text-gray-500 dark:text-slate-400">
                  Rapport Power BI — Revenus mensuels
                </p>
                <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">
                  Histogramme des revenus par mois
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Power BI Revenus par fournisseur */}
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden">
              <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100 dark:border-slate-700">
                <p className="text-sm font-medium text-gray-700 dark:text-slate-200">
                  Revenus par fournisseur
                </p>
                <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                  Power BI
                </span>
              </div>
              <div className="flex items-center justify-center h-40 bg-gray-50 dark:bg-slate-900">
                <div className="text-center">
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0066CC"
                    strokeWidth="1.5"
                    className="mx-auto mb-2"
                  >
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                  <p className="text-xs text-gray-400 dark:text-slate-500">
                    Revenus par fournisseur
                  </p>
                </div>
              </div>
            </div>

            {/* Power BI Revenus par service */}
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden">
              <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100 dark:border-slate-700">
                <p className="text-sm font-medium text-gray-700 dark:text-slate-200">
                  Revenus par service
                </p>
                <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                  Power BI
                </span>
              </div>
              <div className="flex items-center justify-center h-40 bg-gray-50 dark:bg-slate-900">
                <div className="text-center">
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0066CC"
                    strokeWidth="1.5"
                    className="mx-auto mb-2"
                  >
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                  <p className="text-xs text-gray-400 dark:text-slate-500">
                    Revenus par service
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Power BI Top 20 services */}
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100 dark:border-slate-700">
              <p className="text-sm font-medium text-gray-700 dark:text-slate-200">
                Top 20 services — CA global
              </p>
              <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                Power BI
              </span>
            </div>
            <div className="flex items-center justify-center h-48 bg-gray-50 dark:bg-slate-900">
              <div className="text-center">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0066CC"
                  strokeWidth="1.5"
                  className="mx-auto mb-2"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
                <p className="text-xs font-medium text-gray-500 dark:text-slate-400">
                  Top 20 services générateurs de revenus
                </p>
                <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">
                  Par rapport au CA global
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardBusiness;
