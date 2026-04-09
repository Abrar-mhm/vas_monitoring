import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import SidebarOperationnel from "../../components/SidebarOperationnel";

const initialAlertes = [
  {
    id: 1,
    type: "critique",
    titre: "Taux d'échec MMG dépassé",
    message: "MMG — Taux d'échec supérieur à 3% sur le nœud Tunis 2",
    date: "07/04/2026 à 10:30",
    statut: "en cours",
  },
  {
    id: 2,
    type: "avertissement",
    titre: "Latence OCC élevée",
    message: "OCC — Latence élevée détectée : 120ms (seuil: 100ms)",
    date: "07/04/2026 à 09:15",
    statut: "en cours",
  },
  {
    id: 3,
    type: "critique",
    titre: "Taux d'échec MMG dépassé",
    message: "MMG — Taux d'échec supérieur à 3% sur le nœud Sfax",
    date: "06/04/2026 à 15:45",
    statut: "fait",
  },
  {
    id: 4,
    type: "info",
    titre: "Maintenance planifiée",
    message: "Maintenance prévue sur le nœud Sfax — 10/04/2026 à 02:00",
    date: "06/04/2026 à 08:00",
    statut: "non fait",
  },
  {
    id: 5,
    type: "avertissement",
    titre: "Trafic MMG anormal",
    message: "MMG — Pic de trafic détecté : 2,500 msg/s (seuil: 2,000)",
    date: "05/04/2026 à 22:10",
    statut: "fait",
  },
];

function Alertes() {
  const { dark } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [alertes, setAlertes] = useState(initialAlertes);
  const [filtre, setFiltre] = useState("tous");

  const alerteBadge = (type) => {
    if (type === "critique") return "bg-red-100 text-red-800";
    if (type === "avertissement") return "bg-yellow-100 text-yellow-800";
    return "bg-blue-100 text-blue-800";
  };

  const alerteDot = (type) => {
    if (type === "critique") return "bg-red-500";
    if (type === "avertissement") return "bg-yellow-500";
    return "bg-blue-500";
  };

  const filteredAlertes = alertes.filter((a) => {
    if (filtre === "tous") return true;
    if (filtre === "en cours") return a.statut === "en cours";
    if (filtre === "fait") return a.statut === "fait";
    if (filtre === "non fait") return a.statut === "non fait";
    return true;
  });

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
              {alertes.filter((a) => a.statut === "en cours").length} alertes en
              cours
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
                {alertes.filter((a) => a.statut === "en cours").length}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
              <p className="text-xs text-gray-400 dark:text-slate-400 mb-1">
                Fait
              </p>
              <p className="text-2xl font-medium text-green-500">
                {alertes.filter((a) => a.statut === "fait").length}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
              <p className="text-xs text-gray-400 dark:text-slate-400 mb-1">
                Non fait
              </p>
              <p className="text-2xl font-medium text-red-500">
                {alertes.filter((a) => a.statut === "non fait").length}
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

            {filteredAlertes.map((alerte) => (
              <div
                key={alerte.id}
                className="px-4 py-3 flex items-start gap-3 border-b border-gray-100 dark:border-slate-700 last:border-0"
              >
                <div
                  className={`w-2 h-2 rounded-full mt-1.5 min-w-2 ${alerteDot(alerte.type)}`}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${alerteBadge(alerte.type)}`}
                    >
                      {alerte.type.charAt(0).toUpperCase() +
                        alerte.type.slice(1)}
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
                <select
                  value={alerte.statut}
                  onChange={(e) => {
                    setAlertes(
                      alertes.map((a) =>
                        a.id === alerte.id
                          ? { ...a, statut: e.target.value }
                          : a,
                      ),
                    );
                  }}
                  className={`text-xs px-2 py-1 rounded-lg border outline-none cursor-pointer ${
                    alerte.statut === "en cours"
                      ? "bg-orange-50 border-orange-200 text-orange-700"
                      : alerte.statut === "fait"
                        ? "bg-green-50 border-green-200 text-green-700"
                        : "bg-red-50 border-red-200 text-red-700"
                  }`}
                >
                  <option value="en cours">En cours</option>
                  <option value="fait">Fait</option>
                  <option value="non fait">Non fait</option>
                </select>
              </div>
            ))}

            {filteredAlertes.length === 0 && (
              <div className="px-4 py-8 text-center text-gray-400 dark:text-slate-500 text-xs">
                Aucune alerte pour ce filtre
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Alertes;
