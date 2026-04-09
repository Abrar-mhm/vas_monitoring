import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import SidebarBusiness from "../../components/SidebarBusiness";

const donneesServices = {
  YOUSCRIBE: [
    {
      msisdn: "21620123456",
      numero: "853771",
      keyword: "_N",
      prix: 0.35,
      date: "07/04/2026",
    },
    {
      msisdn: "21698765432",
      numero: "853772",
      keyword: "_N",
      prix: 1.8,
      date: "06/04/2026",
    },
    {
      msisdn: "21655987654",
      numero: "853773",
      keyword: "_N",
      prix: 4.5,
      date: "05/04/2026",
    },
  ],
  "PLAY VOD": [
    {
      msisdn: "21620123456",
      numero: "855201",
      keyword: "_N",
      prix: 0.5,
      date: "07/04/2026",
    },
    {
      msisdn: "21644332211",
      numero: "855202",
      keyword: "_N",
      prix: 3.5,
      date: "06/04/2026",
    },
  ],
  "FUZE FORGE": [
    {
      msisdn: "21620123456",
      numero: "8000",
      keyword: "fuz1",
      prix: 0.7,
      date: "07/04/2026",
    },
    {
      msisdn: "21698765432",
      numero: "8000",
      keyword: "fuz2",
      prix: 3.0,
      date: "05/04/2026",
    },
  ],
};

const donneesFournisseurs = {
  TOPNET: [
    { service: "YOUSCRIBE", abonnes: 3, revenuTotal: "6.65 DT", keyword: "_N" },
    { service: "PLAY VOD", abonnes: 2, revenuTotal: "4.00 DT", keyword: "_N" },
    {
      service: "FUZE FORGE",
      abonnes: 2,
      revenuTotal: "3.70 DT",
      keyword: "fuz1/fuz2",
    },
    {
      service: "OUKLA BY TT",
      abonnes: 1,
      revenuTotal: "0.50 DT",
      keyword: "ouk1",
    },
  ],
};

const donneesMSISDN = {
  21620123456: [
    {
      service: "YOUSCRIBE",
      fournisseur: "TOPNET",
      keyword: "_N",
      numero: "853771",
      prix: 0.35,
      date: "07/04/2026",
    },
    {
      service: "PLAY VOD",
      fournisseur: "TOPNET",
      keyword: "_N",
      numero: "855201",
      prix: 0.5,
      date: "06/04/2026",
    },
    {
      service: "FUZE FORGE",
      fournisseur: "TOPNET",
      keyword: "fuz1",
      numero: "8000",
      prix: 0.7,
      date: "05/04/2026",
    },
  ],
  21698765432: [
    {
      service: "OUKLA BY TT",
      fournisseur: "TOPNET",
      keyword: "ouk1",
      numero: "8000",
      prix: 0.5,
      date: "07/04/2026",
    },
    {
      service: "YOUSCRIBE",
      fournisseur: "TOPNET",
      keyword: "_N",
      numero: "853772",
      prix: 1.8,
      date: "04/04/2026",
    },
  ],
};

function Recherche() {
  const { dark } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [msisdn, setMsisdn] = useState("");
  const [resultats, setResultats] = useState(null);

  const [fichierExcel, setFichierExcel] = useState(null);
  const [resultatsExcel, setResultatsExcel] = useState(null);

  const [service, setService] = useState("");
  const [resultatsService, setResultatsService] = useState(null);

  const [fournisseur, setFournisseur] = useState("");
  const [resultatsFournisseur, setResultatsFournisseur] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleRecherche = () => {
    if (!msisdn.trim()) return;
    setLoading(true);
    setResultats(null);
    setTimeout(() => {
      setLoading(false);
      setResultats(donneesMSISDN[msisdn.trim()] || []);
    }, 1000);
  };

  const handleFichierExcel = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFichierExcel(file);
      setResultatsExcel(null);
    }
  };

  const handleRechercheExcel = () => {
    if (!fichierExcel) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResultatsExcel([
        { msisdn: "21620123456", services: 3, totalDT: "1.55 DT" },
        { msisdn: "21698765432", services: 2, totalDT: "2.30 DT" },
        { msisdn: "21655987654", services: 1, totalDT: "0.50 DT" },
      ]);
    }, 1500);
  };

  const handleRechercheService = () => {
    if (!service.trim()) return;
    setLoading(true);
    setResultatsService(null);
    setTimeout(() => {
      setLoading(false);
      setResultatsService(donneesServices[service.trim().toUpperCase()] || []);
    }, 1000);
  };

  const handleRechercheFournisseur = () => {
    if (!fournisseur.trim()) return;
    setLoading(true);
    setResultatsFournisseur(null);
    setTimeout(() => {
      setLoading(false);
      setResultatsFournisseur(
        donneesFournisseurs[fournisseur.trim().toUpperCase()] || [],
      );
    }, 1000);
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
              Recherche par MSISDN, service ou fournisseur
            </p>
          </div>
          <div className="w-10" />
        </div>

        <div className="p-5 flex-1 overflow-auto">
          <div className="grid grid-cols-2 gap-4 mb-4">
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
              {resultats !== null &&
                (resultats.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-4">
                    Aucun service trouvé
                  </p>
                ) : (
                  <div>
                    <p className="text-xs text-gray-400 mb-2">
                      {resultats.length} service(s) pour{" "}
                      <span className="font-medium text-blue-600">
                        {msisdn}
                      </span>
                    </p>
                    <table className="w-full border-collapse text-xs">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-slate-900 text-gray-400">
                          <th className="text-left px-2 py-2 font-medium">
                            Service
                          </th>
                          <th className="text-left px-2 py-2 font-medium">
                            Numéro
                          </th>
                          <th className="text-left px-2 py-2 font-medium">
                            Prix
                          </th>
                          <th className="text-left px-2 py-2 font-medium">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {resultats.map((r, i) => (
                          <tr
                            key={i}
                            className="border-t border-gray-100 dark:border-slate-700"
                          >
                            <td className="px-2 py-2 text-gray-700 dark:text-slate-200">
                              {r.service}
                            </td>
                            <td className="px-2 py-2 font-mono text-blue-600">
                              {r.numero}
                            </td>
                            <td className="px-2 py-2 text-gray-700 dark:text-slate-200">
                              {r.prix} DT
                            </td>
                            <td className="px-2 py-2 text-gray-400">
                              {r.date}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
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
              {resultatsExcel && (
                <table className="w-full border-collapse text-xs">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-slate-900 text-gray-400">
                      <th className="text-left px-2 py-2 font-medium">
                        MSISDN
                      </th>
                      <th className="text-left px-2 py-2 font-medium">
                        Services
                      </th>
                      <th className="text-left px-2 py-2 font-medium">Total</th>
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
                          {r.services}
                        </td>
                        <td className="px-2 py-2 font-medium text-green-600">
                          {r.totalDT}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Recherche par service */}
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="2"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <p className="text-sm font-medium">Recherche par service</p>
              </div>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Ex: YOUSCRIBE"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleRechercheService()
                  }
                  className="flex-1 text-xs px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-slate-200 outline-none"
                />
                <button
                  onClick={handleRechercheService}
                  disabled={loading}
                  className="px-3 py-2 rounded-lg text-xs text-white disabled:opacity-50"
                  style={{ background: "#8b5cf6" }}
                >
                  {loading ? "..." : "Rechercher"}
                </button>
              </div>
              {resultatsService !== null &&
                (resultatsService.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-4">
                    Aucun résultat trouvé
                  </p>
                ) : (
                  <div>
                    <p className="text-xs text-gray-400 mb-2">
                      {resultatsService.length} abonné(s) pour{" "}
                      <span className="font-medium text-purple-600">
                        {service.toUpperCase()}
                      </span>
                    </p>
                    <table className="w-full border-collapse text-xs">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-slate-900 text-gray-400">
                          <th className="text-left px-2 py-2 font-medium">
                            MSISDN
                          </th>
                          <th className="text-left px-2 py-2 font-medium">
                            Numéro
                          </th>
                          <th className="text-left px-2 py-2 font-medium">
                            Prix
                          </th>
                          <th className="text-left px-2 py-2 font-medium">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {resultatsService.map((r, i) => (
                          <tr
                            key={i}
                            className="border-t border-gray-100 dark:border-slate-700"
                          >
                            <td className="px-2 py-2 font-mono text-blue-600">
                              {r.msisdn}
                            </td>
                            <td className="px-2 py-2 font-mono text-gray-500">
                              {r.numero}
                            </td>
                            <td className="px-2 py-2 text-gray-700 dark:text-slate-200">
                              {r.prix} DT
                            </td>
                            <td className="px-2 py-2 text-gray-400">
                              {r.date}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
            </div>

            {/* Recherche par fournisseur */}
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <p className="text-sm font-medium">Recherche par fournisseur</p>
              </div>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Ex: TOPNET"
                  value={fournisseur}
                  onChange={(e) => setFournisseur(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleRechercheFournisseur()
                  }
                  className="flex-1 text-xs px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-slate-200 outline-none"
                />
                <button
                  onClick={handleRechercheFournisseur}
                  disabled={loading}
                  className="px-3 py-2 rounded-lg text-xs text-white disabled:opacity-50"
                  style={{ background: "#f59e0b" }}
                >
                  {loading ? "..." : "Rechercher"}
                </button>
              </div>
              {resultatsFournisseur !== null &&
                (resultatsFournisseur.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-4">
                    Aucun résultat trouvé
                  </p>
                ) : (
                  <div>
                    <p className="text-xs text-gray-400 mb-2">
                      {resultatsFournisseur.length} service(s) pour{" "}
                      <span className="font-medium text-yellow-600">
                        {fournisseur.toUpperCase()}
                      </span>
                    </p>
                    <table className="w-full border-collapse text-xs">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-slate-900 text-gray-400">
                          <th className="text-left px-2 py-2 font-medium">
                            Service
                          </th>
                          <th className="text-left px-2 py-2 font-medium">
                            Abonnés
                          </th>
                          <th className="text-left px-2 py-2 font-medium">
                            Revenu
                          </th>
                          <th className="text-left px-2 py-2 font-medium">
                            Keyword
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {resultatsFournisseur.map((r, i) => (
                          <tr
                            key={i}
                            className="border-t border-gray-100 dark:border-slate-700"
                          >
                            <td className="px-2 py-2 text-gray-700 dark:text-slate-200">
                              {r.service}
                            </td>
                            <td className="px-2 py-2 text-gray-700 dark:text-slate-200">
                              {r.abonnes}
                            </td>
                            <td className="px-2 py-2 font-medium text-green-600">
                              {r.revenuTotal}
                            </td>
                            <td className="px-2 py-2 font-mono text-gray-400">
                              {r.keyword}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recherche;
