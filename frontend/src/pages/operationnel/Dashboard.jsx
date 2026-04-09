import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import SidebarOperationnel from "../../components/SidebarOperationnel";



function DashboardOperationnel() {
  const { dark } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);


 
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
              Dashboard Opérationnel
            </h2>
            <p className="text-xs text-gray-400 dark:text-slate-400">
              Monitoring des services VAS en temps réel
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-lg border border-green-200 flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Tous les services opérationnels
            </span>
          </div>
        </div>

        <div className="p-5 flex-1 overflow-auto">
          {/* Power BI Placeholder */}
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden mb-5">
            <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100 dark:border-slate-700">
              <p className="text-sm font-medium text-gray-700 dark:text-slate-200">
                Analyse trafic MMG vs OCC
              </p>
              <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                Power BI
              </span>
            </div>
            <div className="flex items-center justify-center h-64 bg-gray-50 dark:bg-slate-900">
              <div className="text-center">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0066CC"
                  strokeWidth="1.5"
                  className="mx-auto mb-3"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
                <p className="text-sm font-medium text-gray-500 dark:text-slate-400">
                  Rapport Power BI
                </p>
                <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">
                  Le rapport sera intégré ici via l'URL Power BI
                </p>
                <div className="mt-3 px-4 py-2 rounded-lg border border-dashed border-gray-300 dark:border-slate-600 inline-block">
                  <p className="text-xs text-gray-400 dark:text-slate-500 font-mono">
                    {'<iframe src="URL_POWER_BI" />'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          </div>
        </div>
      </div>
  );
}

export default DashboardOperationnel;
