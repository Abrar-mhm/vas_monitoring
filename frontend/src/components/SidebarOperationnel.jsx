import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { useTheme } from "../context/ThemeContext";
import api from "../api/axios";

function SidebarOperationnel() {
  const { dark, toggleDark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      path: "/operationnel/dashboard",
      label: "Dashboard",
      icon: (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
        </svg>
      ),
    },
    {
      path: "/operationnel/alertes",
      label: "Alertes",
      icon: (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
    },
    {
      path: "/operationnel/suivi-cdr",
      label: "Suivi CDR",
      icon: (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
    },
    {
      path: "/operationnel/services",
      label: "Services SMS+",
      icon: (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      path: "/operationnel/fournisseurs",
      label: "Fournisseurs",
      icon: (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
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
          Analyste Opérationnel
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

      {/* Utilisateur connecté */}
      <div
        className={`rounded-lg p-2 mb-2 ${dark ? "bg-slate-700" : "bg-gray-50 border border-gray-200"}`}
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
            onClick={handleLogout}
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

      {/* Bouton dark/light */}
      <button
        onClick={toggleDark}
        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600"
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
        <span
          className={`text-xs ${dark ? "text-slate-400" : "text-gray-400"}`}
        >
          {dark ? "Mode sombre" : "Mode clair"}
        </span>
      </button>
    </div>
  );
}

export default SidebarOperationnel;
