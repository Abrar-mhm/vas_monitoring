import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import SidebarOperationnel from "../../components/SidebarOperationnel";
import api from "../../api/axios";

function Alertes() {
  const { dark } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [alertes, setAlertes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtre, setFiltre] = useState("tous");

  useEffect(() => {
    fetchAlertes();
  }, []);

  const fetchAlertes = async () => {
    try {
      const response = await api.get("/api/alertes");
      setAlertes(response.data);
    } catch (error) {
      console.error("Erreur chargement alertes", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatut = async (id, statut) => {
    try {
      await api.put(`/api/alertes/${id}/status`, { STATUS: statut });
      setAlertes(
        alertes.map((a) => (a.ID === id ? { ...a, STATUS: statut } : a)),
      );
    } catch (error) {
      console.error("Erreur mise à jour alerte", error);
    }
  };

  const filteredAlertes = alertes.filter((a) => {
    if (filtre === "tous") return true;
    if (filtre === "en cours") return a.STATUS === 0;
    if (filtre === "fait") return a.STATUS === 1;
    if (filtre === "non fait") return a.STATUS === 2;
    return true;
  });

  const typeBadge = (motif) => {
    if (motif?.toLowerCase().includes("critique"))
      return "bg-red-100 text-red-800";
    if (motif?.toLowerCase().includes("avertissement"))
      return "bg-yellow-100 text-yellow-800";
    return "bg-blue-100 text-blue-800";
  };

  const typeDot = (motif) => {
    if (motif?.toLowerCase().includes("critique")) return "bg-red-500";
    if (motif?.toLowerCase().includes("avertissement")) return "bg-yellow-500";
    return "bg-blue-500";
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
              Alertes
            </h2>
            <p className="text-xs text-gray-400 dark:text-slate-400">
              {alertes.filter((a) => a.STATUS === 0).length} alertes en cours
            </p>
          </div>
          <div className="w-10" />
        </div>

        <div className="p-5 flex-1 overflow-auto">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-3 mb-5">
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
              <p className="text-xs text-gray-400 dark:text-slate-400 mb-1">
                Total
              </p>
              <p className="text-2xl font-medium text-blue-600">
                {alertes.length}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
              <p className="text-xs text-gray-400 dark:text-slate-400 mb-1">
                En cours
              </p>
              <p className="text-2xl font-medium text-orange-500">
                {alertes.filter((a) => a.STATUS === 0).length}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
              <p className="text-xs text-gray-400 dark:text-slate-400 mb-1">
                Fait
              </p>
              <p className="text-2xl font-medium text-green-500">
                {alertes.filter((a) => a.STATUS === 1).length}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
              <p className="text-xs text-gray-400 dark:text-slate-400 mb-1">
                Non fait
              </p>
              <p className="text-2xl font-medium text-red-500">
                {alertes.filter((a) => a.STATUS === 2).length}
              </p>
            </div>
          </div>

          {/* Tableau alertes */}
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100 dark:border-slate-700">
              <p className="text-sm font-medium text-gray-700 dark:text-slate-200">
                Liste des alertes
              </p>
              <div className="flex gap-2">
                {["tous", "en cours", "fait", "non fait"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFiltre(f)}
                    className={`text-xs px-3 py-1 rounded-lg border transition-colors ${
                      filtre === f
                        ? "bg-blue-600 text-white border-blue-600"
                        : "border-gray-200 dark:border-slate-600 text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700"
                    }`}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="px-4 py-8 text-center text-xs text-gray-400">
                Chargement des alertes...
              </div>
            ) : filteredAlertes.length === 0 ? (
              <div className="px-4 py-8 text-center text-xs text-gray-400">
                Aucune alerte pour ce filtre
              </div>
            ) : (
              filteredAlertes.map((alerte) => (
                <div
                  key={alerte.ID}
                  className="px-4 py-3 flex items-start gap-3 border-b border-gray-100 dark:border-slate-700 last:border-0"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-1.5 min-w-2 ${typeDot(alerte.MOTIF)}`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${typeBadge(alerte.MOTIF)}`}
                      >
                        {alerte.MOTIF}
                      </span>
                      <span className="text-xs font-medium text-gray-700 dark:text-slate-200">
                        {alerte.NOM_SERVICE}
                      </span>
                      <span className="text-xs text-gray-300 dark:text-slate-500">
                        {alerte.START_DATE}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 dark:text-slate-400">
                      {alerte.NOM_FOURNISSEUR} — {alerte.KEYWORD} —{" "}
                      {alerte.AUGMENTATION}% — {alerte.COUNT_NB_SMS} SMS
                    </p>
                  </div>
                  <select
                    value={
                      alerte.STATUS === 0
                        ? "en cours"
                        : alerte.STATUS === 1
                          ? "fait"
                          : "non fait"
                    }
                    onChange={(e) => {
                      const val =
                        e.target.value === "en cours"
                          ? 0
                          : e.target.value === "fait"
                            ? 1
                            : 2;
                      updateStatut(alerte.ID, val);
                    }}
                    className={`text-xs px-2 py-1 rounded-lg border outline-none cursor-pointer ${
                      alerte.STATUS === 0
                        ? "bg-orange-50 border-orange-200 text-orange-700"
                        : alerte.STATUS === 1
                          ? "bg-green-50 border-green-200 text-green-700"
                          : "bg-red-50 border-red-200 text-red-700"
                    }`}
                  >
                    <option value="en cours">En cours</option>
                    <option value="fait">Fait</option>
                    <option value="non fait">Non fait</option>
                  </select>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Alertes;
