import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import SidebarBusiness from "../../components/SidebarBusiness";
import api from "../../api/axios";

function AlertesBusiness() {
  const { dark } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [alertes, setAlertes] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const marquerLu = async (id) => {
    try {
      await api.put(`/api/alertes/${id}/status`, { STATUS: 1 });
      setAlertes(alertes.map((a) => (a.ID === id ? { ...a, STATUS: 1 } : a)));
    } catch (error) {
      console.error("Erreur mise à jour alerte", error);
    }
  };

  const toutMarquerLu = async () => {
    try {
      await Promise.all(
        alertes.map((a) =>
          api.put(`/api/alertes/${a.ID}/status`, { STATUS: 1 }),
        ),
      );
      setAlertes(alertes.map((a) => ({ ...a, STATUS: 1 })));
    } catch (error) {
      console.error("Erreur mise à jour alertes", error);
    }
  };

  const nonLues = alertes.filter((a) => a.STATUS === 0).length;
  const critiques = alertes.filter((a) =>
    a.MOTIF?.toLowerCase().includes("critique"),
  ).length;

  const typeBadge = (motif) => {
    if (motif?.toLowerCase().includes("critique"))
      return {
        badge: "bg-red-100 text-red-800",
        dot: "bg-red-500",
        label: "Critique",
      };
    if (motif?.toLowerCase().includes("avertissement"))
      return {
        badge: "bg-yellow-100 text-yellow-800",
        dot: "bg-yellow-500",
        label: "Avertissement",
      };
    return {
      badge: "bg-blue-100 text-blue-800",
      dot: "bg-blue-500",
      label: "Info",
    };
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
              Alertes Business
            </h2>
            <p className="text-xs text-gray-400 dark:text-slate-400">
              {nonLues} alertes non lues
            </p>
          </div>
          <button
            onClick={toutMarquerLu}
            className="text-xs px-3 py-1.5 rounded-lg border text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100"
          >
            Tout marquer lu
          </button>
        </div>

        <div className="p-5 flex-1 overflow-auto">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-5">
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
                Critiques
              </p>
              <p className="text-2xl font-medium text-red-500">{critiques}</p>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
              <p className="text-xs text-gray-400 dark:text-slate-400 mb-1">
                Non lues
              </p>
              <p className="text-2xl font-medium text-yellow-500">{nonLues}</p>
            </div>
          </div>

          {/* Liste alertes */}
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-700">
              <p className="text-sm font-medium text-gray-700 dark:text-slate-200">
                Alertes automatiques
              </p>
            </div>

            {loading ? (
              <div className="px-4 py-8 text-center text-xs text-gray-400">
                Chargement des alertes...
              </div>
            ) : alertes.length === 0 ? (
              <div className="px-4 py-8 text-center text-xs text-gray-400">
                Aucune alerte disponible
              </div>
            ) : (
              alertes.map((alerte) => {
                const style = typeBadge(alerte.MOTIF);
                return (
                  <div
                    key={alerte.ID}
                    className={`px-4 py-3 flex items-start gap-3 border-b border-gray-100 dark:border-slate-700 last:border-0 ${alerte.STATUS === 0 ? "bg-blue-50 dark:bg-slate-700" : ""}`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-1.5 min-w-2 ${style.dot}`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${style.badge}`}
                        >
                          {style.label}
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
                      <p className="text-xs text-gray-400 dark:text-slate-400 mt-0.5">
                        {alerte.MOTIF}
                      </p>
                    </div>
                    {alerte.STATUS === 0 && (
                      <button
                        onClick={() => marquerLu(alerte.ID)}
                        className="text-xs px-2 py-1 rounded-lg border border-gray-200 dark:border-slate-600 text-gray-400 hover:text-gray-600 whitespace-nowrap"
                      >
                        Lu
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlertesBusiness;
