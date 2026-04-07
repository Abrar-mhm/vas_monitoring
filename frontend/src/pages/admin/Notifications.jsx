import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useTheme } from "../../context/ThemeContext";

const initialNotifications = [
  {
    id: 1,
    type: "critique",
    titre: "Tentatives de connexion échouées",
    message:
      "m.benali@tunisietelecom.tn — 5 tentatives échouées consécutives. Compte temporairement bloqué.",
    date: "06/04/2026 à 14:32",
    lu: false,
  },
  {
    id: 2,
    type: "critique",
    titre: "Connexion depuis un nouvel appareil",
    message:
      "admin@tunisietelecom.tn — Connexion depuis un nouvel appareil détectée. IP: 192.168.1.45 — Windows 11 / Chrome",
    date: "06/04/2026 à 11:15",
    lu: false,
  },
  {
    id: 3,
    type: "avertissement",
    titre: "Tentatives de connexion échouées",
    message:
      "f.trabelsi@tunisietelecom.tn — 3 tentatives échouées. Encore 2 tentatives avant blocage.",
    date: "05/04/2026 à 09:45",
    lu: false,
  },
  {
    id: 4,
    type: "info",
    titre: "Connexion depuis un nouvel appareil",
    message:
      "m.benali@tunisietelecom.tn — Connexion depuis MacOS / Safari. IP: 10.0.0.12",
    date: "04/04/2026 à 16:20",
    lu: false,
  },
];

function Notifications() {
  const { dark } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState(initialNotifications);

  const nonLues = notifications.filter((n) => !n.lu).length;
  const alertes = notifications.filter((n) => n.type === "critique").length;

  const marquerLu = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, lu: true } : n)),
    );
  };

  const toutMarquerLu = () => {
    setNotifications(notifications.map((n) => ({ ...n, lu: true })));
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
    if (type === "succes")
      return {
        badge: "bg-green-100 text-green-800",
        dot: "bg-green-500",
        label: "Succès",
      };
    return {
      badge: "bg-blue-100 text-blue-800",
      dot: "bg-blue-500",
      label: "Info",
    };
  };

  const alertesNotifs = notifications.filter(
    (n) => n.type === "critique" || n.type === "avertissement",
  );
  const systemeNotifs = notifications.filter(
    (n) => n.type === "info" || n.type === "succes",
  );

  return (
    <div
      className={`flex h-screen ${dark ? "bg-slate-900 text-slate-100" : "bg-gray-100 text-gray-800"}`}
    >
      {sidebarOpen && <Sidebar />}

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
              Notifications système
            </h2>
            <p className="text-xs text-gray-400 dark:text-slate-400">
              {nonLues} notifications non lues
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
                {notifications.length}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
              <p className="text-xs text-gray-400 dark:text-slate-400 mb-1">
                Alertes
              </p>
              <p className="text-2xl font-medium text-red-500">{alertes}</p>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
              <p className="text-xs text-gray-400 dark:text-slate-400 mb-1">
                Non lues
              </p>
              <p className="text-2xl font-medium text-yellow-500">{nonLues}</p>
            </div>
          </div>

          {/* Alertes de sécurité */}
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100 dark:border-slate-700">
              <p className="text-sm font-medium text-gray-700 dark:text-slate-200">
                Alertes de sécurité
              </p>
              <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-800">
                {alertesNotifs.length} alertes
              </span>
            </div>
            {alertesNotifs.map((n) => {
              const style = typeBadge(n.type);
              return (
                <div
                  key={n.id}
                  className={`px-4 py-3 flex items-start gap-3 border-b border-gray-100 dark:border-slate-700 last:border-0 ${!n.lu ? "bg-blue-50 dark:bg-slate-700" : ""}`}
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
                      <span className="text-xs font-medium text-gray-800 dark:text-slate-200">
                        {n.titre}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 dark:text-slate-400">
                      {n.message}
                    </p>
                    <p className="text-xs text-gray-300 dark:text-slate-500 mt-1">
                      {n.date}
                    </p>
                  </div>
                  {!n.lu && (
                    <button
                      onClick={() => marquerLu(n.id)}
                      className="text-xs px-2 py-1 rounded-lg border border-gray-200 dark:border-slate-600 text-gray-400 hover:text-gray-600 whitespace-nowrap"
                    >
                      Lu
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Notifications système */}
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100 dark:border-slate-700">
              <p className="text-sm font-medium text-gray-700 dark:text-slate-200">
                Notifications système
              </p>
              <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                {systemeNotifs.length} notifications
              </span>
            </div>
            {systemeNotifs.map((n) => {
              const style = typeBadge(n.type);
              return (
                <div
                  key={n.id}
                  className={`px-4 py-3 flex items-start gap-3 border-b border-gray-100 dark:border-slate-700 last:border-0 ${!n.lu ? "bg-blue-50 dark:bg-slate-700" : ""}`}
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
                      <span className="text-xs font-medium text-gray-800 dark:text-slate-200">
                        {n.titre}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 dark:text-slate-400">
                      {n.message}
                    </p>
                    <p className="text-xs text-gray-300 dark:text-slate-500 mt-1">
                      {n.date}
                    </p>
                  </div>
                  {!n.lu && (
                    <button
                      onClick={() => marquerLu(n.id)}
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

export default Notifications;
