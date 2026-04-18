import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("L'email est obligatoire");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await axios.post("http://localhost:8000/api/forgot-password", { email });
      setSuccess(true);
    } catch (err) {
      if (err.response?.status === 422) {
        setError("Aucun compte trouvé avec cet email");
      } else {
        setError("Erreur lors de l'envoi de l'email");
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
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12 19.79 19.79 0 0 1 1.93 3.38 2 2 0 0 1 3.91 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <h2 className="text-sm font-medium text-gray-800 mb-2">
              Email envoyé !
            </h2>
            <p className="text-xs text-gray-400 mb-6">
              Un lien de réinitialisation a été envoyé à{" "}
              <span className="font-medium text-blue-600">{email}</span>.
              Vérifiez votre boîte mail.
            </p>
            <Link to="/login" className="text-xs text-blue-600 hover:underline">
              Retour à la connexion
            </Link>
          </div>
        ) : (
          <>
            <h2 className="text-sm font-medium text-gray-800 mb-1">
              Mot de passe oublié ?
            </h2>
            <p className="text-xs text-gray-400 mb-6">
              Entrez votre email et nous vous enverrons un lien pour
              réinitialiser votre mot de passe.
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg px-4 py-3 mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                  Adresse email
                </label>
                <input
                  type="email"
                  placeholder="vous@tunisietelecom.tn"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{ backgroundColor: "#0066CC" }}
                className="w-full text-white rounded-lg py-2.5 text-sm font-medium hover:opacity-90 disabled:opacity-50 mb-4"
              >
                {loading ? "Envoi en cours..." : "Envoyer le lien"}
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

export default ForgotPassword;
