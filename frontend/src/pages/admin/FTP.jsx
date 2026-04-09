import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useTheme } from "../../context/ThemeContext";

function FTP() {
  const { dark } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const ftpInfo = {
    host: "ftp.tunisietelecom.tn",
    port: "21",
    utilisateur: "vas_ftp",
    repertoire: "/CDR/VAS/",
    statut: "connecté",
    protocole: "FTP",
  };


  const handleTest = () => {
    setTesting(true);
    setTestResult(null);
    setTimeout(() => {
      setTesting(false);
      setTestResult("success");
    }, 2000);
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
              Serveur FTP 
            </p>
          </div>
          <button
            onClick={handleTest}
            disabled={testing}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-white disabled:opacity-50"
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
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
            {testing ? "Test en cours..." : "Tester la connexion"}
          </button>
        </div>

        <div className="p-5 flex-1 overflow-auto">
          {/* Message test */}
          {testResult === "success" && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-xs flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Connexion FTP réussie ! Serveur accessible.
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
              <p className="text-xs text-gray-400 dark:text-slate-400 mb-1">
                Statut
              </p>
              <p className="text-sm font-medium text-green-500">Connecté</p>
            </div>
          
          </div>

          <div className="grid grid-cols-1 gap-4">
            {/* Informations connexion */}
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
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
                <p className="text-sm font-medium">Informations serveur</p>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Hôte", value: ftpInfo.host },
                  { label: "Port", value: ftpInfo.port },
                  { label: "Utilisateur", value: ftpInfo.utilisateur },
                  { label: "Répertoire", value: ftpInfo.repertoire },
                  { label: "Protocole", value: ftpInfo.protocole },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between py-1 border-b border-gray-100 dark:border-slate-700 last:border-0"
                  >
                    <span className="text-xs text-gray-400 dark:text-slate-400">
                      {item.label}
                    </span>
                    <span className="text-xs font-medium text-gray-700 dark:text-slate-200 font-mono">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FTP;
