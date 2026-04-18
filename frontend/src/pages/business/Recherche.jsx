import { useState } from "react";
import * as XLSX from "xlsx";
import { useTheme } from "../../context/ThemeContext";
import SidebarBusiness from "../../components/SidebarBusiness";
import api from "../../api/axios";

function Recherche() {
  const { dark } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [msisdn, setMsisdn] = useState("");
  const [resultats, setResultats] = useState(null);

  const [fichierExcel, setFichierExcel] = useState(null);
  const [resultatsExcel, setResultatsExcel] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleRecherche = async () => {
    if (!msisdn.trim()) return;
    setLoading(true);
    setResultats(null);
    try {
      const response = await api.get(`/api/recherche/msisdn/${msisdn.trim()}`);
      setResultats(response.data);
    } catch (error) {
      console.error("Erreur recherche MSISDN", error);
      setResultats({ occ: [], mmg: [] });
    } finally {
      setLoading(false);
    }
  };

  const handleFichierExcel = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFichierExcel(file);
      setResultatsExcel(null);
    }
  };

  const handleRechercheExcel = async () => {
    if (!fichierExcel) return;
    setLoading(true);
    setResultatsExcel(null);
    try {
      const data = await fichierExcel.arrayBuffer();
      const workbook = XLSX.read(data);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const msisdns = rows
        .flat()
        .map((v) => String(v).trim())
        .filter((v) => v && v !== "MSISDN" && v !== "msisdn");

      const response = await api.post("/api/recherche/excel", { msisdns });
      setResultatsExcel(response.data);
    } catch (error) {
      console.error("Erreur recherche Excel", error);
      setResultatsExcel([]);
    } finally {
      setLoading(false);
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
              Recherche
            </h2>
            <p className="text-xs text-gray-400 dark:text-slate-400">
              Recherche par MSISDN ou liste Excel
            </p>
          </div>
          <div className="w-10" />
        </div>

        <div className="p-5 flex-1 overflow-auto">
          <div className="grid grid-cols-2 gap-4">
            {/* Recherche par MSISDN */}
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0066CC"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <p className="text-sm font-medium">Recherche par MSISDN</p>
              </div>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Ex: 21620123456"
                  value={msisdn}
                  onChange={(e) => setMsisdn(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleRecherche()}
                  className="flex-1 text-xs px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-slate-200 outline-none"
                />
                <button
                  onClick={handleRecherche}
                  disabled={loading}
                  className="px-3 py-2 rounded-lg text-xs text-white disabled:opacity-50"
                  style={{ background: "#0066CC" }}
                >
                  {loading ? "..." : "Rechercher"}
                </button>
              </div>

              {resultats !== null && (
                <div>
                  {/* Résultats OCC */}
                  <p className="text-xs font-medium text-gray-600 dark:text-slate-300 mb-1 mt-2">
                    OCC — {resultats.occ?.length || 0} enregistrement(s)
                  </p>
                  {resultats.occ?.length === 0 ? (
                    <p className="text-xs text-gray-400 text-center py-2">
                      Aucun résultat OCC
                    </p>
                  ) : (
                    <table className="w-full border-collapse text-xs mb-3">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-slate-900 text-gray-400">
                          <th className="text-left px-2 py-2 font-medium">
                            Date
                          </th>
                          <th className="text-left px-2 py-2 font-medium">
                            Event
                          </th>
                          <th className="text-left px-2 py-2 font-medium">
                            Partenaire
                          </th>
                          <th className="text-left px-2 py-2 font-medium">
                            Montant
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {resultats.occ.map((r, i) => (
                          <tr
                            key={i}
                            className="border-t border-gray-100 dark:border-slate-700"
                          >
                            <td className="px-2 py-2 text-gray-400">
                              {r.START_DATE}
                            </td>
                            <td className="px-2 py-2 text-gray-700 dark:text-slate-200">
                              {r.EVENT_TYPE}
                            </td>
                            <td className="px-2 py-2 text-gray-700 dark:text-slate-200">
                              {r.PARTNER}
                            </td>
                            <td className="px-2 py-2 font-medium text-green-600">
                              {r.CHARGE_AMOUNT} DT
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                  {/* Résultats MMG */}
                  <p className="text-xs font-medium text-gray-600 dark:text-slate-300 mb-1 mt-2">
                    MMG — {resultats.mmg?.length || 0} enregistrement(s)
                  </p>
                  {resultats.mmg?.length === 0 ? (
                    <p className="text-xs text-gray-400 text-center py-2">
                      Aucun résultat MMG
                    </p>
                  ) : (
                    <table className="w-full border-collapse text-xs">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-slate-900 text-gray-400">
                          <th className="text-left px-2 py-2 font-medium">
                            Date
                          </th>
                          <th className="text-left px-2 py-2 font-medium">
                            Event
                          </th>
                          <th className="text-left px-2 py-2 font-medium">
                            Call Type
                          </th>
                          <th className="text-left px-2 py-2 font-medium">
                            Service
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {resultats.mmg.map((r, i) => (
                          <tr
                            key={i}
                            className="border-t border-gray-100 dark:border-slate-700"
                          >
                            <td className="px-2 py-2 text-gray-400">
                              {r.START_DATE}
                            </td>
                            <td className="px-2 py-2 text-gray-700 dark:text-slate-200">
                              {r.EVENT_TYPE}
                            </td>
                            <td className="px-2 py-2 text-gray-700 dark:text-slate-200">
                              {r.CALL_TYPE}
                            </td>
                            <td className="px-2 py-2 text-gray-700 dark:text-slate-200">
                              {r.SERVICE_TYPE}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>

            {/* Recherche par liste Excel */}
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <p className="text-sm font-medium">Recherche par liste Excel</p>
              </div>
              <div className="border-2 border-dashed border-gray-200 dark:border-slate-600 rounded-lg p-4 text-center mb-3">
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFichierExcel}
                  className="hidden"
                  id="fileInput"
                />
                <label htmlFor="fileInput" className="cursor-pointer">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="1.5"
                    className="mx-auto mb-2"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <p className="text-xs text-gray-500 dark:text-slate-400">
                    {fichierExcel
                      ? fichierExcel.name
                      : "Cliquez pour importer un fichier Excel"}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    .xlsx, .xls, .csv
                  </p>
                </label>
              </div>
              <button
                onClick={handleRechercheExcel}
                disabled={!fichierExcel || loading}
                className="w-full py-2 text-xs rounded-lg text-white disabled:opacity-50 mb-3"
                style={{ background: "#10b981" }}
              >
                {loading ? "Traitement en cours..." : "Lancer la recherche"}
              </button>

              {resultatsExcel !== null &&
                (resultatsExcel.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-4">
                    Aucun résultat trouvé
                  </p>
                ) : (
                  <table className="w-full border-collapse text-xs">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-slate-900 text-gray-400">
                        <th className="text-left px-2 py-2 font-medium">
                          MSISDN
                        </th>
                        <th className="text-left px-2 py-2 font-medium">OCC</th>
                        <th className="text-left px-2 py-2 font-medium">MMG</th>
                        <th className="text-left px-2 py-2 font-medium">
                          Total DT
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultatsExcel.map((r, i) => (
                        <tr
                          key={i}
                          className="border-t border-gray-100 dark:border-slate-700"
                        >
                          <td className="px-2 py-2 font-mono text-blue-600">
                            {r.msisdn}
                          </td>
                          <td className="px-2 py-2 text-gray-700 dark:text-slate-200">
                            {r.occ}
                          </td>
                          <td className="px-2 py-2 text-gray-700 dark:text-slate-200">
                            {r.mmg}
                          </td>
                          <td className="px-2 py-2 font-medium text-green-600">
                            {r.total_dt} DT
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recherche;
