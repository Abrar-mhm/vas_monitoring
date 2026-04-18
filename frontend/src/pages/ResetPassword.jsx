import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    if (!password || password.length < 8) return "Minimum 8 caractères";
    if (!/[A-Z]/.test(password)) return "Au moins une majuscule";
    if (!/[a-z]/.test(password)) return "Au moins une minuscule";
    if (!/[0-9]/.test(password)) return "Au moins un chiffre";
    if (!/[!@#$%^&*]/.test(password)) return "Au moins un caractère spécial";
    if (password !== passwordConfirm)
      return "Les mots de passe ne correspondent pas";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    setError("");
    try {
      await axios.post("http://localhost:8000/api/reset-password", {
        email,
        token,
        password,
      });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      if (err.response?.status === 400) {
        setError(err.response.data.message);
      } else {
        setError("Erreur lors de la réinitialisation");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-xl border border-gray-200 p-8 w-full max-w-md shadow-sm">
        {/* Logo */}
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

        {success ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#16a34a"
                strokeWidth="2"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="text-sm font-medium text-gray-800 mb-2">
              Mot de passe réinitialisé !
            </h2>
            <p className="text-xs text-gray-400 mb-6">
              Votre mot de passe a été modifié avec succès. Vous allez être
              redirigé vers la page de connexion...
            </p>
            <Link to="/login" className="text-xs text-blue-600 hover:underline">
              Aller à la connexion
            </Link>
          </div>
        ) : (
          <>
            <h2 className="text-sm font-medium text-gray-800 mb-1">
              Nouveau mot de passe
            </h2>
            <p className="text-xs text-gray-400 mb-6">
              Choisissez un nouveau mot de passe sécurisé.
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg px-4 py-3 mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  autoComplete="new-password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={passwordConfirm}
                  autoComplete="new-password"
                  onChange={(e) => {
                    setPasswordConfirm(e.target.value);
                    setError("");
                  }}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-3 mb-4 text-xs text-gray-400">
                Le mot de passe doit contenir : 8 caractères minimum, une
                majuscule, une minuscule, un chiffre et un caractère spécial
                (!@#$%^&*)
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{ backgroundColor: "#0066CC" }}
                className="w-full text-white rounded-lg py-2.5 text-sm font-medium hover:opacity-90 disabled:opacity-50 mb-4"
              >
                {loading
                  ? "Réinitialisation..."
                  : "Réinitialiser le mot de passe"}
              </button>

              <div className="text-center">
                <Link
                  to="/login"
                  className="text-xs text-blue-600 hover:underline"
                >
                  Retour à la connexion
                </Link>
              </div>
            </form>
          </>
        )}
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} Tunisie Telecom. Tous les droits sont
          réservés.
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
