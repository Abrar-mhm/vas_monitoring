import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import SidebarBusiness from "../../components/SidebarBusiness";

const initialAlertes = [
  {
    id: 1,
    type: "critique",
    titre: "Anomalie revenus MMG",
    message:
      "Les revenus MMG du 07/04/2026 sont inférieurs de 25% par rapport à la moyenne mensuelle.",
    date: "07/04/2026 à 08:00",
    lu: false,
  },
  {
    id: 2,
    type: "critique",
    titre: "Fraude détectée",
    message:
      "MSISDN 21620123456 — Souscription anormale à 15 services en moins de 5 minutes.",
    date: "06/04/2026 à 23:45",
    lu: false,
  },
  {
    id: 3,
    type: "avertissement",
    titre: "Baisse revenus fournisseur",
    message: "TOPNET — Revenus en baisse de 12% par rapport au mois précédent.",
    date: "06/04/2026 à 10:00",
    lu: false,
  },
  {
    id: 4,
    type: "info",
    titre: "Nouveau service activé",
    message:
      "Service FUZE FORGE (fuz2) — 120 souscriptions enregistrées aujourd'hui.",
    date: "05/04/2026 à 14:30",
    lu: true,
  },
  {
    id: 5,
    type: "avertissement",
    titre: "Anomalie trafic OCC",
    message:
      "Trafic OCC du 05/04/2026 supérieur de 30% à la normale. Vérification requise.",
    date: "05/04/2026 à 09:00",
    lu: true,
  },
];

function AlertesBusiness() {
  const { dark } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [alertes, setAlertes] = useState(initialAlertes);

  const nonLues = alertes.filter((a) => !a.lu).length;
  const critiques = alertes.filter((a) => a.type === "critique").length;

  const marquerLu = (id) => {
    setAlertes(alertes.map((a) => (a.id === id ? { ...a, lu: true } : a)));
  };

  const toutMarquerLu = () => {
    setAlertes(alertes.map((a) => ({ ...a, lu: true })));
  };

  const typeBadge = (type) => {
    if (type === "critique")
      return {
        badge: "bg-red-100 text-red-800",
        dot: "bg-red-500",
        label: "Critique",
      };
    if (type === "avertissement")
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
            {alertes.map((alerte) => {
              const style = typeBadge(alerte.type);
              return (
                <div
                  key={alerte.id}
                  className={`px-4 py-3 flex items-start gap-3 border-b border-gray-100 dark:border-slate-700 last:border-0 ${!alerte.lu ? "bg-blue-50 dark:bg-slate-700" : ""}`}
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
                        {alerte.titre}
                      </span>
                      <span className="text-xs text-gray-300 dark:text-slate-500">
                        {alerte.date}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 dark:text-slate-400">
                      {alerte.message}
                    </p>
                  </div>
                  {!alerte.lu && (
                    <button
                      onClick={() => marquerLu(alerte.id)}
                      className="text-xs px-2 py-1 rounded-lg border border-gray-200 dark:border-slate-600 text-gray-400 hover:text-gray-600 whitespace-nowrap"
                    >
                      Lu
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlertesBusiness;
