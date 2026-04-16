import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import SidebarOperationnel from "../../components/SidebarOperationnel";
import api from "../../api/axios";

function Fournisseurs() {
  const { dark } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [fournisseurs, setFournisseurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedFournisseur, setSelectedFournisseur] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [form, setForm] = useState({
    provider_name: "",
    nationalite: "",
    id_fiscale: "",
    adresse: "",
  });

  useEffect(() => {
    fetchFournisseurs();
  }, []);

  const fetchFournisseurs = async () => {
    try {
      const response = await api.get("/api/fournisseurs");
      setFournisseurs(response.data);
    } catch (error) {
      console.error("Erreur chargement fournisseurs", error);
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    const errors = {};
    if (!form.provider_name || form.provider_name.length < 2)
      errors.provider_name = "Minimum 2 caractères";
    if (!form.nationalite) errors.nationalite = "Nationalité obligatoire";
    if (!form.id_fiscale) errors.id_fiscale = "ID fiscale obligatoire";
    if (!form.adresse) errors.adresse = "Adresse obligatoire";
    return errors;
  };

  const filtered = fournisseurs.filter(
    (f) =>
      f.PROVIDER_NAME?.toLowerCase().includes(search.toLowerCase()) ||
      f.ID_FISCALE?.toLowerCase().includes(search.toLowerCase()),
  );

  const handleAdd = async () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    try {
      const response = await api.post("/api/fournisseurs", {
        PROVIDER_NAME: form.provider_name,
        NATIONALITE: form.nationalite,
        ID_FISCALE: form.id_fiscale,
        ADRESSE: form.adresse,
      });
      setFournisseurs([...fournisseurs, response.data]);
      setForm({
        provider_name: "",
        nationalite: "",
        id_fiscale: "",
        adresse: "",
      });
      setFormErrors({});
      setModalAdd(false);
    } catch (error) {
      console.error("Erreur ajout fournisseur", error);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await api.put(
        `/api/fournisseurs/${selectedFournisseur.ID}`,
        {
          PROVIDER_NAME: form.provider_name,
          NATIONALITE: form.nationalite,
          ID_FISCALE: form.id_fiscale,
          ADRESSE: form.adresse,
        },
      );
      setFournisseurs(
        fournisseurs.map((f) =>
          f.ID === selectedFournisseur.ID ? response.data : f,
        ),
      );
      setModalEdit(false);
    } catch (error) {
      console.error("Erreur modification fournisseur", error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/api/fournisseurs/${selectedFournisseur.ID}`);
      setFournisseurs(
        fournisseurs.filter((f) => f.ID !== selectedFournisseur.ID),
      );
      setModalDelete(false);
    } catch (error) {
      console.error("Erreur suppression fournisseur", error);
    }
  };

  const openEdit = (fournisseur) => {
    setSelectedFournisseur(fournisseur);
    setForm({
      provider_name: fournisseur.PROVIDER_NAME,
      nationalite: fournisseur.NATIONALITE,
      id_fiscale: fournisseur.ID_FISCALE,
      adresse: fournisseur.ADRESSE,
    });
    setModalEdit(true);
  };

  const openDelete = (fournisseur) => {
    setSelectedFournisseur(fournisseur);
    setModalDelete(true);
  };

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
              Gestion des Fournisseurs
            </h2>
            <p className="text-xs text-gray-400 dark:text-slate-400">
              {fournisseurs.length} fournisseurs enregistrés
            </p>
          </div>
          <button
            onClick={() => {
              setFormErrors({});
              setModalAdd(true);
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-white"
            style={{ background: "#0066CC" }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Ajouter fournisseur
          </button>
        </div>

        <div className="p-5 flex-1 overflow-auto">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
              <p className="text-xs text-gray-400 dark:text-slate-400 mb-1">
                Total fournisseurs
              </p>
              <p className="text-2xl font-medium text-blue-600">
                {fournisseurs.length}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
              <p className="text-xs text-gray-400 dark:text-slate-400 mb-1">
                Nationalités
              </p>
              <p className="text-2xl font-medium text-green-500">
                {new Set(fournisseurs.map((f) => f.NATIONALITE)).size}
              </p>
            </div>
          </div>

          {/* Tableau */}
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100 dark:border-slate-700">
              <p className="text-sm font-medium text-gray-700 dark:text-slate-200">
                Liste des fournisseurs
              </p>
              <input
                type="text"
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-slate-200 outline-none w-40"
              />
            </div>

            {loading ? (
              <div className="px-4 py-8 text-center text-xs text-gray-400 dark:text-slate-500">
                Chargement des fournisseurs...
              </div>
            ) : filtered.length === 0 ? (
              <div className="px-4 py-8 text-center text-xs text-gray-400 dark:text-slate-500">
                Aucun fournisseur trouvé
              </div>
            ) : (
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-slate-900 text-xs text-gray-400 dark:text-slate-400">
                    <th className="text-left px-4 py-3 font-medium">ID</th>
                    <th className="text-left px-4 py-3 font-medium">
                      Nom fournisseur
                    </th>
                    <th className="text-left px-4 py-3 font-medium">
                      Nationalité
                    </th>
                    <th className="text-left px-4 py-3 font-medium">
                      ID Fiscale
                    </th>
                    <th className="text-left px-4 py-3 font-medium">Adresse</th>
                    <th className="text-left px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((f, index) => (
                    <tr
                      key={f.ID}
                      className="border-t border-gray-100 dark:border-slate-700"
                    >
                      <td className="px-4 py-3 text-xs text-gray-400 dark:text-slate-500">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3 text-xs font-medium text-gray-700 dark:text-slate-200">
                        {f.PROVIDER_NAME}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500 dark:text-slate-400">
                        {f.NATIONALITE}
                      </td>
                      <td className="px-4 py-3 text-xs font-mono text-blue-600">
                        {f.ID_FISCALE}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500 dark:text-slate-400">
                        {f.ADRESSE}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEdit(f)}
                            className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100"
                          >
                            <svg
                              width="11"
                              height="11"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                            Modifier
                          </button>
                          <button
                            onClick={() => openDelete(f)}
                            className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border border-red-200 text-red-600 bg-red-50 hover:bg-red-100"
                          >
                            <svg
                              width="11"
                              height="11"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6l-1 14H6L5 6" />
                              <path d="M10 11v6M14 11v6" />
                              <path d="M9 6V4h6v2" />
                            </svg>
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Modal Ajouter */}
      {modalAdd && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-96 border border-gray-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium dark:text-slate-100">
                Ajouter un fournisseur
              </h3>
              <button
                onClick={() => setModalAdd(false)}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
              >
                ×
              </button>
            </div>
            <div className="space-y-3">
              {[
                { label: "Nom fournisseur", key: "provider_name" },
                { label: "Nationalité", key: "nationalite" },
                { label: "ID Fiscale", key: "id_fiscale" },
                { label: "Adresse", key: "adresse" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-xs text-gray-400 dark:text-slate-400 block mb-1">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    value={form[field.key]}
                    onChange={(e) =>
                      setForm({ ...form, [field.key]: e.target.value })
                    }
                    className={`w-full text-xs px-3 py-2 rounded-lg border bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-slate-200 outline-none ${formErrors[field.key] ? "border-red-400" : "border-gray-200 dark:border-slate-600"}`}
                  />
                  {formErrors[field.key] && (
                    <p className="text-red-500 text-xs mt-0.5">
                      {formErrors[field.key]}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setModalAdd(false)}
                className="flex-1 py-2 text-xs rounded-lg border border-gray-200 dark:border-slate-600 text-gray-600 dark:text-slate-300"
              >
                Annuler
              </button>
              <button
                onClick={handleAdd}
                className="flex-1 py-2 text-xs rounded-lg text-white"
                style={{ background: "#0066CC" }}
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Modifier */}
      {modalEdit && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-96 border border-gray-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium dark:text-slate-100">
                Modifier le fournisseur
              </h3>
              <button
                onClick={() => setModalEdit(false)}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
              >
                ×
              </button>
            </div>
            <div className="space-y-3">
              {[
                { label: "Nom fournisseur", key: "provider_name" },
                { label: "Nationalité", key: "nationalite" },
                { label: "ID Fiscale", key: "id_fiscale" },
                { label: "Adresse", key: "adresse" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-xs text-gray-400 dark:text-slate-400 block mb-1">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    value={form[field.key]}
                    onChange={(e) =>
                      setForm({ ...form, [field.key]: e.target.value })
                    }
                    className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-slate-200 outline-none"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setModalEdit(false)}
                className="flex-1 py-2 text-xs rounded-lg border border-gray-200 dark:border-slate-600 text-gray-600 dark:text-slate-300"
              >
                Annuler
              </button>
              <button
                onClick={handleEdit}
                className="flex-1 py-2 text-xs rounded-lg text-white"
                style={{ background: "#0066CC" }}
              >
                Modifier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Supprimer */}
      {modalDelete && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-72 border border-gray-200 dark:border-slate-700 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#dc2626"
                strokeWidth="2"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14H6L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4h6v2" />
              </svg>
            </div>
            <h3 className="text-sm font-medium mb-1 dark:text-slate-100">
              Supprimer le fournisseur ?
            </h3>
            <p className="text-xs text-gray-400 dark:text-slate-400 mb-1">
              {selectedFournisseur?.PROVIDER_NAME}
            </p>
            <p className="text-xs text-red-500 mb-4">
              Cette action est irréversible.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setModalDelete(false)}
                className="flex-1 py-2 text-xs rounded-lg border border-gray-200 dark:border-slate-600 text-gray-600 dark:text-slate-300"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2 text-xs rounded-lg bg-red-600 text-white"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Fournisseurs;
