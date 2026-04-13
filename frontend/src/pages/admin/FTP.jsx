import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useTheme } from "../../context/ThemeContext";

function FTP() {
  const { dark } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    host: "ftp.tunisietelecom.tn",
    port: "21",
    utilisateur: "vas_ftp",
    password: "",
    repertoire: "/CDR/VAS/",
    protocole: "FTP",
  });

  const handleTest = () => {
    setTesting(true);
    setTestResult(null);
    setTimeout(() => {
      setTesting(false);
      const resultat = Math.random() > 0.3 ? "success" : "error";
      setTestResult(resultat);
    }, 2000);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

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
              Gestion FTP
            </h2>
            <p className="text-xs text-gray-400 dark:text-slate-400">
              Configuration serveur FTP
            </p>
          </div>
          <div className="w-10" />
        </div>

        <div className="p-5 flex-1 overflow-auto">
          {/* Message test */}
          {testResult === "success" && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-xs flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Connexion FTP réussie ! Serveur accessible.
            </div>
          )}
          {testResult === "error" && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              Connexion FTP échouée ! Vérifiez les paramètres.
            </div>
          )}

          {/* Statut */}
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4 flex items-center gap-3 mb-5">
            <div
              className={`w-3 h-3 rounded-full ${testResult === "error" ? "bg-red-500" : "bg-green-500"}`}
            />
            <div>
              <p className="text-xs text-gray-400 dark:text-slate-400">
                Statut de la connexion
              </p>
              <p
                className={`text-sm font-medium ${testResult === "error" ? "text-red-500" : "text-green-500"}`}
              >
                {testResult === "error"
                  ? "Connexion échouée"
                  : "Serveur FTP connecté"}
              </p>
            </div>
          </div>

          {/* Formulaire */}
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-5">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0066CC"
                strokeWidth="2"
              >
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
              <p className="text-sm font-medium">Paramètres de connexion</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  label: "Hôte",
                  key: "host",
                  placeholder: "ftp.tunisietelecom.tn",
                },
                { label: "Port", key: "port", placeholder: "21" },
                {
                  label: "Utilisateur",
                  key: "utilisateur",
                  placeholder: "vas_ftp",
                },
                {
                  label: "Répertoire CDR",
                  key: "repertoire",
                  placeholder: "/CDR/VAS/",
                },
                { label: "Protocole", key: "protocole", placeholder: "FTP" },
              ].map((item) => (
                <div key={item.key}>
                  <label className="text-xs text-gray-400 dark:text-slate-400 block mb-1">
                    {item.label}
                  </label>
                  <input
                    type="text"
                    value={form[item.key]}
                    placeholder={item.placeholder}
                    onChange={(e) =>
                      setForm({ ...form, [item.key]: e.target.value })
                    }
                    className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-slate-200 outline-none font-mono"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs text-gray-400 dark:text-slate-400 block mb-1">
                  Mot de passe
                </label>
                <input
                  type="password"
                  value={form.password}
                  placeholder="••••••••"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-slate-200 outline-none"
                />
              </div>
            </div>

            {/* Boutons */}
            <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-gray-100 dark:border-slate-700">
              {saved && (
                <span className="text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-lg border border-green-200 flex items-center">
                  ✓ Enregistré
                </span>
              )}
              <button
                onClick={handleTest}
                disabled={testing}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs border border-gray-200 dark:border-slate-600 text-gray-600 dark:text-slate-300 disabled:opacity-50"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="23 4 23 10 17 10" />
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                </svg>
                {testing ? "Test en cours..." : "Tester la connexion"}
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs text-white"
                style={{ background: "#0066CC" }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FTP;
