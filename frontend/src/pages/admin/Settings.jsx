import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useTheme } from "../../context/ThemeContext";

function Settings() {
  const { dark } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [saved, setSaved] = useState(false);
  const [activeBloc, setActiveBloc] = useState("profil");

  const [profil, setProfil] = useState({
    nom: "Administrateur",
    email: "admin@tunisietelecom.tn",
    motDePasseActuel: "",
    nouveauMotDePasse: "",
  });

  const [preferences, setPreferences] = useState({
    alertesSecurite: true,
    emailNotification: "admin@tunisietelecom.tn",
  });

  const [securite, setSecurite] = useState({
    tentativesMax: "5",
    blocageTempo: "15",
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const menuItems = [
    {
      key: "profil",
      label: "Profil",
      desc: "Informations personnelles",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      key: "preferences",
      label: "Préférences",
      desc: "Notifications & alertes",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      ),
    },
    {
      key: "securite",
      label: "Sécurité",
      desc: "Tentatives & blocage",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
    },
  ];

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
              Paramètres
            </h2>
            <p className="text-xs text-gray-400 dark:text-slate-400">
              Gérez vos préférences et paramètres
            </p>
          </div>
          <div>
            {saved && (
              <span className="text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-lg border border-green-200">
                ✓ Enregistré avec succès
              </span>
            )}
          </div>
        </div>

        <div className="p-5 flex-1 overflow-auto">
          <div className="flex gap-5">
            {/* Menu gauche */}
            <div className="w-52 min-w-52">
              <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden">
                {menuItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setActiveBloc(item.key)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left border-b border-gray-100 dark:border-slate-700 last:border-0 transition-colors ${
                      activeBloc === item.key
                        ? "bg-blue-50 dark:bg-slate-700 text-blue-600"
                        : "text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700"
                    }`}
                  >
                    <div
                      className={
                        activeBloc === item.key
                          ? "text-blue-600"
                          : "text-gray-400"
                      }
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-medium">{item.label}</p>
                      <p className="text-xs text-gray-400 dark:text-slate-500">
                        {item.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Contenu */}
            <div className="flex-1">
              <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6">
                {/* Bloc Profil */}
                {activeBloc === "profil" && (
                  <div>
                    <h3 className="text-sm font-medium mb-1 text-gray-800 dark:text-slate-100">
                      Profil
                    </h3>
                    <p className="text-xs text-gray-400 dark:text-slate-400 mb-5">
                      Mettez à jour vos informations personnelles
                    </p>

                    {/* Avatar */}
                    <div className="flex items-center gap-4 mb-5 pb-5 border-b border-gray-100 dark:border-slate-700">
                      <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-medium">
                        AD
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-700 dark:text-slate-200 mb-1">
                          Photo de profil
                        </p>
                        <p className="text-xs text-gray-400 dark:text-slate-500">
                          Initiales générées automatiquement
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="text-xs text-gray-400 dark:text-slate-400 block mb-1">
                          Nom complet
                        </label>
                        <input
                          type="text"
                          value={profil.nom}
                          onChange={(e) =>
                            setProfil({ ...profil, nom: e.target.value })
                          }
                          className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-slate-200 outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 dark:text-slate-400 block mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value={profil.email}
                          onChange={(e) =>
                            setProfil({ ...profil, email: e.target.value })
                          }
                          className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-slate-200 outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-400 dark:text-slate-400 block mb-1">
                          Mot de passe actuel
                        </label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          value={profil.motDePasseActuel}
                          onChange={(e) =>
                            setProfil({
                              ...profil,
                              motDePasseActuel: e.target.value,
                            })
                          }
                          className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-slate-200 outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 dark:text-slate-400 block mb-1">
                          Nouveau mot de passe
                        </label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          value={profil.nouveauMotDePasse}
                          onChange={(e) =>
                            setProfil({
                              ...profil,
                              nouveauMotDePasse: e.target.value,
                            })
                          }
                          className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-slate-200 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Bloc Préférences */}
                {activeBloc === "preferences" && (
                  <div>
                    <h3 className="text-sm font-medium mb-1 text-gray-800 dark:text-slate-100">
                      Préférences
                    </h3>
                    <p className="text-xs text-gray-400 dark:text-slate-400 mb-5">
                      Configurez vos notifications
                    </p>

                    <div className="mb-4">
                      <label className="text-xs text-gray-400 dark:text-slate-400 block mb-1">
                        Email de notification
                      </label>
                      <input
                        type="email"
                        value={preferences.emailNotification}
                        onChange={(e) =>
                          setPreferences({
                            ...preferences,
                            emailNotification: e.target.value,
                          })
                        }
                        className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-slate-200 outline-none"
                      />
                    </div>

                    <div className="flex items-center justify-between py-3 border-t border-gray-100 dark:border-slate-700">
                      <div>
                        <p className="text-xs font-medium text-gray-700 dark:text-slate-200">
                          Alertes de sécurité
                        </p>
                        <p className="text-xs text-gray-400 dark:text-slate-500">
                          Recevoir un email lors d'une tentative échouée
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setPreferences({
                            ...preferences,
                            alertesSecurite: !preferences.alertesSecurite,
                          })
                        }
                        className={`w-10 h-5 rounded-full relative transition-colors ${preferences.alertesSecurite ? "bg-blue-600" : "bg-gray-300"}`}
                      >
                        <div
                          className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${preferences.alertesSecurite ? "left-5" : "left-0.5"}`}
                        />
                      </button>
                    </div>
                  </div>
                )}

                {/* Bloc Sécurité */}
                {activeBloc === "securite" && (
                  <div>
                    <h3 className="text-sm font-medium mb-1 text-gray-800 dark:text-slate-100">
                      Sécurité
                    </h3>
                    <p className="text-xs text-gray-400 dark:text-slate-400 mb-5">
                      Configurez les paramètres de sécurité
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-400 dark:text-slate-400 block mb-1">
                          Tentatives max avant blocage
                        </label>
                        <input
                          type="number"
                          value={securite.tentativesMax}
                          onChange={(e) =>
                            setSecurite({
                              ...securite,
                              tentativesMax: e.target.value,
                            })
                          }
                          className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-slate-200 outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 dark:text-slate-400 block mb-1">
                          Durée de blocage (minutes)
                        </label>
                        <input
                          type="number"
                          value={securite.blocageTempo}
                          onChange={(e) =>
                            setSecurite({
                              ...securite,
                              blocageTempo: e.target.value,
                            })
                          }
                          className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-slate-200 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Boutons */}
                <div className="flex gap-3 justify-end mt-6 pt-4 border-t border-gray-100 dark:border-slate-700">
                  <button className="px-4 py-2 text-xs rounded-lg border border-gray-200 dark:border-slate-600 text-gray-600 dark:text-slate-300 hover:bg-gray-50">
                    Annuler
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 text-xs rounded-lg text-white flex items-center gap-2"
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
      </div>
    </div>
  );
}

export default Settings;
