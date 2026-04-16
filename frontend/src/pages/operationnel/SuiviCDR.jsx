import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import SidebarOperationnel from "../../components/SidebarOperationnel";

const initialJobs = [
  { id: 1, flux: "MMG", job: "Detail", etat: "inprogress" },
  { id: 2, flux: "MMG", job: "AGG", etat: "Error" },
  { id: 3, flux: "MMG", job: "Cleaning", etat: "Stoped" },
  { id: 4, flux: "OCC", job: "Detail", etat: "inprogress" },
  { id: 5, flux: "OCC", job: "AGG", etat: "Stoped" },
  { id: 6, flux: "OCC", job: "Cleaning", etat: "Stoped" },
];

function SuiviCDR() {
  const { dark } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [jobs, setJobs] = useState(initialJobs);

  const etatBadge = (etat) => {
    if (etat === "inprogress") return "bg-blue-100 text-blue-800";
    if (etat === "Error") return "bg-red-100 text-red-800";
    if (etat === "Stoped") return "bg-gray-100 text-gray-600";
    if (etat === "Done") return "bg-green-100 text-green-800";
    return "bg-gray-100 text-gray-600";
  };

  const handleStart = (id) => {
    setJobs(jobs.map((j) => (j.id === id ? { ...j, etat: "inprogress" } : j)));
  };

  const mmgJobs = jobs.filter((j) => j.flux === "MMG");
  const occJobs = jobs.filter((j) => j.flux === "OCC");

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
              Suivi CDR
            </h2>
            <p className="text-xs text-gray-400 dark:text-slate-400">
              Liste des jobs MMG et OCC
            </p>
          </div>
          <div className="w-10" />
        </div>

        <div className="p-5 flex-1 overflow-auto">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
              <p className="text-xs text-gray-400 dark:text-slate-400 mb-1">
                En cours
              </p>
              <p className="text-2xl font-medium text-blue-600">
                {jobs.filter((j) => j.etat === "inprogress").length}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
              <p className="text-xs text-gray-400 dark:text-slate-400 mb-1">
                Erreurs
              </p>
              <p className="text-2xl font-medium text-red-500">
                {jobs.filter((j) => j.etat === "Error").length}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
              <p className="text-xs text-gray-400 dark:text-slate-400 mb-1">
                Arrêtés
              </p>
              <p className="text-2xl font-medium text-gray-500">
                {jobs.filter((j) => j.etat === "Stoped").length}
              </p>
            </div>
          </div>

          {/* Tableau List Job */}
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-700">
              <p className="text-sm font-medium text-gray-700 dark:text-slate-200">
                List Job
              </p>
            </div>
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-slate-900 text-xs text-gray-400 dark:text-slate-400">
                  <th className="text-left px-4 py-3 font-medium">Flux</th>
                  <th className="text-left px-4 py-3 font-medium">Job</th>
                  <th className="text-left px-4 py-3 font-medium">État</th>
                  <th className="text-left px-4 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* MMG Jobs */}
                {mmgJobs.map((job, index) => (
                  <tr
                    key={job.id}
                    className="border-t border-gray-100 dark:border-slate-700"
                  >
                    <td className="px-4 py-3 text-xs font-medium text-gray-700 dark:text-slate-200">
                      {index === 0 ? (
                        <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                          MMG
                        </span>
                      ) : (
                        ""
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-700 dark:text-slate-200">
                      {job.job}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${etatBadge(job.etat)}`}
                      >
                        {job.etat}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleStart(job.id)}
                        className="text-xs px-3 py-1 rounded-lg border border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100"
                      >
                        Start
                      </button>
                    </td>
                  </tr>
                ))}

                {/* Séparateur */}
                <tr className="border-t-2 border-gray-200 dark:border-slate-600">
                  <td
                    colSpan="4"
                    className="px-4 py-1 bg-gray-50 dark:bg-slate-900"
                  ></td>
                </tr>

                {/* OCC Jobs */}
                {occJobs.map((job, index) => (
                  <tr
                    key={job.id}
                    className="border-t border-gray-100 dark:border-slate-700"
                  >
                    <td className="px-4 py-3 text-xs font-medium text-gray-700 dark:text-slate-200">
                      {index === 0 ? (
                        <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                          OCC
                        </span>
                      ) : (
                        ""
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-700 dark:text-slate-200">
                      {job.job}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${etatBadge(job.etat)}`}
                      >
                        {job.etat}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleStart(job.id)}
                        className="text-xs px-3 py-1 rounded-lg border border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100"
                      >
                        Start
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuiviCDR;
