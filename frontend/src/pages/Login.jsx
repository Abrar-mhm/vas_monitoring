import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); //affiche "Connexion..." pendant que la requête est en cours
  const [serverError, setServerError] = useState(""); //affiche les erreurs venant du serveur (ex: mauvais mot de passe)
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "L'email est obligatoire";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Format email invalide";
    }
    if (!password) {
      newErrors.password = "Le mot de passe est obligatoire";
    } else if (password.length < 8) {
      newErrors.password = "Minimum 8 caractères";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = "Au moins une lettre majuscule";
    } else if (!/[a-z]/.test(password)) {
      newErrors.password = "Au moins une lettre minuscule";
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = "Au moins un chiffre";
    } else if (!/[!@#$%^&*]/.test(password)) {
      newErrors.password = "Au moins un caractère spécial (!@#$%^&*)";
    }
    return newErrors;
  };

  const handleSubmit = async () => {
    //async/await permet d'attendre la réponse sans bloquer l'interface.
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setServerError("");

    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });

      const { token, role } = response.data;

      // Sauvegarder le token
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      // Rediriger selon le rôle
      if (role === "Administrateur") {
        navigate("/admin/users");
      } else if (role === "Analyste Business") {
        navigate("/business/dashboard");
      } else if (role === "Analyste Opérationnel") {
        navigate("/operationnel/dashboard");
      } 
    } catch (error) {
      if (error.response?.status === 401) {
        setServerError("Email ou mot de passe incorrect");
      } else {
        setServerError("Erreur de connexion au serveur");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-xl border border-gray-200 p-8 w-full max-w-md">
        {/* Logo et titre */}
        <div className="text-center mb-8">
          <img
            src="/src/assets/logo.png"
            alt="Tunisie Telecom"
            className="w-24 mx-auto mb-4"
          />
          <p className="text-xs text-gray-400 uppercase tracking-widest">
            Tunisie Telecom
          </p>
          <h1 className="text-xl font-medium text-gray-800 mt-1">
            VAS Monitoring
          </h1>
        </div>

        {/* Bouton Google */}
        <button className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 mb-6">
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continuer avec Google
        </button>

        {/* Séparateur */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-xs text-gray-400">ou</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Erreur serveur */}
        {serverError && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">
            {serverError}
          </div>
        )}

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1.5">
            Adresse email
          </label>
          <input
            type="email"
            placeholder="vous@tunisietelecom.tn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none ${errors.email ? "border-red-400" : "border-gray-200 focus:border-blue-500"}`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Mot de passe */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1.5">
            Mot de passe
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none ${errors.password ? "border-red-400" : "border-gray-200 focus:border-blue-500"}`}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        {/* Bouton */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{ backgroundColor: "#0066CC" }}
          className="w-full text-white rounded-lg py-2.5 text-sm font-medium hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </div>
    </div>
  );
}

export default Login;
