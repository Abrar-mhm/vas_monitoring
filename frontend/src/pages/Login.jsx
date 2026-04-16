import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
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
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

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
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-xl border border-gray-200 p-8 w-full max-w-md shadow-sm">
        {/* Logo et titre */}
        <div className="text-center mb-10">
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

        {/* Formulaire */}
        <form onSubmit={handleSubmit}>
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
              className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none transition-colors ${
                errors.email
                  ? "border-red-400"
                  : "border-gray-200 focus:border-blue-500"
              }`}
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
              className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none transition-colors ${
                errors.password
                  ? "border-red-400"
                  : "border-gray-200 focus:border-blue-500"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Bouton Se connecter */}
          <button
            type="submit"
            disabled={loading}
            style={{ backgroundColor: "#0066CC" }}
            className="w-full text-white rounded-lg py-2.5 text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity mb-4"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>

          {/* Mot de passe oublié (Centré en dessous) */}
          <div className="text-center">
            <Link
              to="/forgot-password"
              className="text-xs text-blue-600 hover:underline font-medium"
            >
              Mot de passe oublié ?
            </Link>
          </div>
        </form>
      </div>

      {/* Footer Droits Réservés */}
      <div className="mt-8 text-center">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} Tunisie Telecom. Tous les droits sont
          réservés.
        </p>
      </div>
    </div>
  );
}

export default Login;
