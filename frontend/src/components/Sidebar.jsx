import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; //useLocation  pour savoir sur quelle page on est actuellement
import logo from "../assets/logo.png";
import { useTheme } from "../context/ThemeContext";
import api from "../api/axios";

//
function Sidebar() {
  const { dark, toggleDark } = useTheme(); //toggleDark → fonction qui bascule entre mode clair et sombre
  //useTheme() est un hook personnalisé qu'on a créé nous-mêmes dans ThemeContext.jsx
  const navigate = useNavigate();
  const location = useLocation();

  //navItems tableau des objets qui contient por chaque item path , label et icon
  const navItems = [
    {
      path: "/admin/users", //l'url de la page
      label: "Utilisateurs", // le texte affiché
      //l'icone affiché
      icon: (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      path: "/admin/database",
      label: "Base de données",
      icon: (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      ),
    },
    {
      path: "/admin/ftp",
      label: "FTP",
      icon: (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      path: "/admin/settings",
      label: "Paramètres",
      icon: (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
        </svg>
      ),
    },
  ];
  const handleLogout = async () => {
    try {
      await api.post("/api/logout");
    } catch (error) {
      console.error("Erreur déconnexion", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/login");
    }
  };
  const [profile, setProfile] = useState({
    name: "Administrateur",
    email: "admin@tt.tn",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/api/profile");
        setProfile({
          name: response.data.name || response.data.NAME,
          email: response.data.email || response.data.EMAIL,
        });
      } catch (error) {
        console.error("Erreur profil", error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div
      className={`w-52 min-w-52 flex flex-col h-screen p-3 ${dark ? "bg-slate-800 border-r border-slate-700" : "bg-white border-r border-gray-200"}`}
    >
      {/* Logo */}
      <div className="mb-5 px-1">
        <img
          src={logo}
          alt="Tunisie Telecom"
          className="h-10 object-contain mb-1"
        />
        <p className="text-xs font-medium">VAS Monitoring</p>
        <p className={`text-xs ${dark ? "text-slate-400" : "text-gray-400"}`}>
          Administration
        </p>
      </div>
      {/* Navigation */}
      <p
        className={`text-xs uppercase tracking-widest mb-2 px-1 ${dark ? "text-slate-500" : "text-gray-400"}`}
      >
        Menu
      </p>
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-colors ${
              location.pathname === item.path
                ? "bg-blue-600 text-white"
                : dark
                  ? "text-slate-300 hover:bg-slate-700"
                  : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
      <div className="flex-1" />
      {/* Utilisateur connecté + Déconnexion */}
      <div
        onClick={() => navigate("/admin/settings")}
        className={`rounded-lg p-2 cursor-pointer ${dark ? "bg-slate-700 hover:bg-slate-600" : "bg-gray-50 border border-gray-200 hover:bg-gray-100"}`}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-medium min-w-7">
            {(profile.name || "AD")
              .split(" ")
              .map((n) => n[0])
              .join("")
              .substring(0, 2)
              .toUpperCase()}
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-xs font-medium truncate">{profile.name}</p>
            <p
              className={`text-xs truncate ${dark ? "text-slate-400" : "text-gray-400"}`}
            >
              {profile.email}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLogout();
            }}
            title="Déconnexion"
            className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 dark:hover:bg-slate-600 hover:text-red-600"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </div>
      <button
        onClick={toggleDark}
        className="mt-3 w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600"
      >
        {dark ? (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="#e2e8f0"
            stroke="#e2e8f0"
            strokeWidth="2"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="#f59e0b"
            stroke="#f59e0b"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
          </svg>
        )}
        <span className="text-xs text-gray-400 dark:text-slate-400">
          {dark ? "Mode sombre" : "Mode clair"}
        </span>
      </button>
    </div>
  );
}

export default Sidebar;
