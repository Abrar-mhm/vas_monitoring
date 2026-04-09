import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import SidebarOperationnel from "../../components/SidebarOperationnel";

const initialSuivi = {
  mmg: [
    {
      id: 1,
      fichier: "MMG_CDR_20260407.dsv",
      date: "07/04/2026",
      loading: "Terminé",
      agregation: "Terminé",
      suppression: "Terminé",
    },
    {
      id: 2,
      fichier: "MMG_CDR_20260406.dsv",
      date: "06/04/2026",
      loading: "Terminé",
      agregation: "Terminé",
      suppression: "En cours",
    },
    {
      id: 3,
      fichier: "MMG_CDR_20260405.dsv",
      date: "05/04/2026",
      loading: "Terminé",
      agregation: "En cours",
      suppression: "En attente",
    },
    {
      id: 4,
      fichier: "MMG_CDR_20260404.dsv",
      date: "04/04/2026",
      loading: "Échoué",
      agregation: "En attente",
      suppression: "En attente",
    },
  ],
  occ: [
    {
      id: 1,
      fichier: "OCC_CDR_20260407.xlsx",
      date: "07/04/2026",
      loading: "Terminé",
      agregation: "Terminé",
      suppression: "Terminé",
    },
    {
      id: 2,
      fichier: "OCC_CDR_20260406.xlsx",
      date: "06/04/2026",
      loading: "Terminé",
      agregation: "Terminé",
      suppression: "En cours",
    },
    {
      id: 3,
      fichier: "OCC_CDR_20260405.xlsx",
      date: "05/04/2026",
      loading: "En cours",
      agregation: "En attente",
      suppression: "En attente",
    },
    {
      id: 4,
      fichier: "OCC_CDR_20260404.xlsx",
      date: "04/04/2026",
      loading: "Échoué",
      agregation: "En attente",
      suppression: "En attente",
    },
  ],
};

function SuiviCDR() {
  const { dark } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [onglet, setOnglet] = useState("mmg");
  const suivi = initialSuivi[onglet];

  const statutBadge = (statut) => {
    if (statut === "Terminé") return "bg-green-100 text-green-800";
    if (statut === "En cours") return "bg-blue-100 text-blue-800";
    if (statut === "Échoué") return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-500";
  };

  return (
    <div
      className={`flex h-screen ${dark ? "bg-slate-900 text-slate-100" : "bg-gray-100 text-gray-800"}`}
    >
      {sidebarOpen && <SidebarOperationnel />}

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
              Suivi CDR
            </h2>
            <p className="text-xs text-gray-400 dark:text-slate-400">
              Loading, agrégation et suppression des CDR
            </p>
          </div>
          <div className="w-10" />
        </div>

        <div className="p-5 flex-1 overflow-auto">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-3 mb-5">
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
              <p className="text-xs text-gray-400 dark:text-slate-400 mb-1">
                Total fichiers
              </p>
              <p className="text-2xl font-medium text-blue-600">
                {suivi.length}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
              <p className="text-xs text-gray-400 dark:text-slate-400 mb-1">
                Loading terminé
              </p>
              <p className="text-2xl font-medium text-green-500">
                {suivi.filter((s) => s.loading === "Terminé").length}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
              <p className="text-xs text-gray-400 dark:text-slate-400 mb-1">
                En cours
              </p>
              <p className="text-2xl font-medium text-blue-500">
                {suivi.filter((s) => s.loading === "En cours").length}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
              <p className="text-xs text-gray-400 dark:text-slate-400 mb-1">
                Échoués
              </p>
              <p className="text-2xl font-medium text-red-500">
                {suivi.filter((s) => s.loading === "Échoué").length}
              </p>
            </div>
          </div>

          {/* Onglets MMG / OCC */}
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100 dark:border-slate-700">
              <div className="flex gap-2">
                <button
                  onClick={() => setOnglet("mmg")}
                  className={`text-xs px-4 py-1.5 rounded-lg border transition-colors ${
                    onglet === "mmg"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-200 dark:border-slate-600 text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700"
                  }`}
                >
                  CDR MMG
                </button>
                <button
                  onClick={() => setOnglet("occ")}
                  className={`text-xs px-4 py-1.5 rounded-lg border transition-colors ${
                    onglet === "occ"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-200 dark:border-slate-600 text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700"
                  }`}
                >
                  CDR OCC
                </button>
              </div>
              <p className="text-xs text-gray-400 dark:text-slate-500">
                {suivi.length} fichiers
              </p>
            </div>

            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-slate-900 text-xs text-gray-400 dark:text-slate-400">
                  <th className="text-left px-4 py-3 font-medium">Fichier</th>
                  <th className="text-left px-4 py-3 font-medium">Date</th>
                  <th className="text-left px-4 py-3 font-medium">Loading</th>
                  <th className="text-left px-4 py-3 font-medium">
                    Agrégation
                  </th>
                  <th className="text-left px-4 py-3 font-medium">
                    Suppression
                  </th>
                </tr>
              </thead>
              <tbody>
                {suivi.map((s) => (
                  <tr
                    key={s.id}
                    className="border-t border-gray-100 dark:border-slate-700"
                  >
                    <td className="px-4 py-3 text-xs font-mono text-gray-700 dark:text-slate-200">
                      {s.fichier}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400 dark:text-slate-400">
                      {s.date}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${statutBadge(s.loading)}`}
                      >
                        {s.loading}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${statutBadge(s.agregation)}`}
                      >
                        {s.agregation}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${statutBadge(s.suppression)}`}
                      >
                        {s.suppression}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuiviCDR;
