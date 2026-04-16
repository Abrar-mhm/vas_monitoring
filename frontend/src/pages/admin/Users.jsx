import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { useTheme } from "../../context/ThemeContext";
import api from "../../api/axios";

function Users() {
  const { dark } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Analyste Business",
    direction: "",
    tel: "",
    image: "",
  });
  const [triColonne, setTriColonne] = useState(null);
  const [triDirection, setTriDirection] = useState("asc");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Erreur chargement utilisateurs", error);
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    const errors = {};
    if (!form.name || form.name.length < 3)
      errors.name = "Minimum 3 caractères";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email))
      errors.email = "Email invalide";
    if (!form.password || form.password.length < 8)
      errors.password = "Minimum 8 caractères";
    else if (!/[A-Z]/.test(form.password))
      errors.password = "Au moins une majuscule";
    else if (!/[a-z]/.test(form.password))
      errors.password = "Au moins une minuscule";
    else if (!/[0-9]/.test(form.password))
      errors.password = "Au moins un chiffre";
    else if (!/[!@#$%^&*]/.test(form.password))
      errors.password = "Au moins un caractère spécial";
    if (!form.tel || !/^\d{8}$/.test(form.tel))
      errors.tel = "8 chiffres requis";
    if (!form.direction) errors.direction = "Direction obligatoire";
    return errors;
  };

  const filtered = users
    .filter(
      (u) =>
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      if (!triColonne) return 0;
      const valA = String(a[triColonne] || "").toLowerCase();
      const valB = String(b[triColonne] || "").toLowerCase();
      return triDirection === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });

  const handleTri = (colonne) => {
    if (triColonne === colonne) {
      setTriDirection(triDirection === "asc" ? "desc" : "asc");
    } else {
      setTriColonne(colonne);
      setTriDirection("asc");
    }
  };

  const triIcon = (colonne) => {
    if (triColonne !== colonne) return " ↕";
    return triDirection === "asc" ? " ↑" : " ↓";
  };

  const getAvatar = (name) => {
    return (name || "")
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const avatarColor = (role) => {
    if (role === "Administrateur") return "bg-blue-600";
    if (role === "Analyste Business") return "bg-green-500";
    return "bg-yellow-500";
  };

  const handleAdd = async () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    try {
      const response = await api.post("/api/users", form);
      setUsers([...users, response.data]);
      setForm({
        name: "",
        email: "",
        password: "",
        role: "Analyste Business",
        direction: "",
        tel: "",
        image: "",
      });
      setFormErrors({});
      setModalAdd(false);
    } catch (error) {
      console.error("Erreur ajout utilisateur", error);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await api.put(`/api/users/${selectedUser.id}`, form);
      setUsers(
        users.map((u) => (u.id === selectedUser.id ? response.data : u)),
      );
      setModalEdit(false);
    } catch (error) {
      console.error("Erreur modification utilisateur", error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/api/users/${selectedUser.id}`);
      setUsers(users.filter((u) => u.id !== selectedUser.id));
      setModalDelete(false);
    } catch (error) {
      console.error("Erreur suppression utilisateur", error);
    }
  };

  const openEdit = (user) => {
    setSelectedUser(user);
    setForm({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
      direction: user.direction || "",
      tel: user.tel || "",
      image: user.image || "",
    });
    setModalEdit(true);
  };

  const openDelete = (user) => {
    setSelectedUser(user);
    setModalDelete(true);
  };

  const roleBadge = (role) => {
    if (role === "Administrateur") return "bg-blue-100 text-blue-800";
    if (role === "Analyste Business") return "bg-green-100 text-green-800";
    return "bg-yellow-100 text-yellow-800";
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

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
              Gestion des utilisateurs
            </h2>
            <p className="text-xs text-gray-400 dark:text-slate-400">
              {users.length} utilisateurs enregistrés
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
            Ajouter utilisateur
          </button>
        </div>

        <div className="p-5 flex-1 overflow-auto">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
              <p className="text-xs text-gray-400 dark:text-slate-400 mb-1">
                Total utilisateurs
              </p>
              <p className="text-2xl font-medium text-blue-600">
                {users.length}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
              <p className="text-xs text-gray-400 dark:text-slate-400 mb-1">
                Analystes Business
              </p>
              <p className="text-2xl font-medium text-green-500">
                {users.filter((u) => u.role === "Analyste Business").length}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
              <p className="text-xs text-gray-400 dark:text-slate-400 mb-1">
                Analystes Opérationnels
              </p>
              <p className="text-2xl font-medium text-yellow-500">
                {users.filter((u) => u.role === "Analyste Opérationnel").length}
              </p>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100 dark:border-slate-700">
              <p className="text-sm font-medium text-gray-700 dark:text-slate-200">
                Liste des utilisateurs
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
              <div className="px-4 py-8 text-center text-xs text-gray-400">
                Chargement des utilisateurs...
              </div>
            ) : (
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-slate-900 text-xs text-gray-400 dark:text-slate-400">
                    <th
                      className="text-left px-4 py-3 font-medium cursor-pointer"
                      onClick={() => handleTri("name")}
                    >
                      Nom{triIcon("name")}
                    </th>
                    <th
                      className="text-left px-4 py-3 font-medium cursor-pointer"
                      onClick={() => handleTri("email")}
                    >
                      Email{triIcon("email")}
                    </th>
                    <th
                      className="text-left px-4 py-3 font-medium cursor-pointer"
                      onClick={() => handleTri("role")}
                    >
                      Rôle{triIcon("role")}
                    </th>
                    <th className="text-left px-4 py-3 font-medium">Statut</th>
                    <th
                      className="text-left px-4 py-3 font-medium cursor-pointer"
                      onClick={() => handleTri("created_at")}
                    >
                      Ajouté le {triIcon("created_at")}
                    </th>
                    <th className="text-left px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((user) => (
                    <tr
                      key={user.id}
                      className="border-t border-gray-100 dark:border-slate-700"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-medium min-w-7 ${avatarColor(user.role)}`}
                          >
                            {getAvatar(user.name)}
                          </div>
                          <span className="text-gray-800 dark:text-slate-200">
                            {user.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-400 dark:text-slate-400 text-xs">
                        {user.email}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${roleBadge(user.role)}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${user.statut === "actif" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                        >
                          {user.statut}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-400 dark:text-slate-400 text-xs">
                        {formatDate(user.created_at)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEdit(user)}
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
                            onClick={() => openDelete(user)}
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
      {/* Modal Ajouter */}
      {modalAdd && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-[550px] border border-gray-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium dark:text-slate-100">
                Ajouter un utilisateur
              </h3>
              <button
                onClick={() => setModalAdd(false)}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Nom complet", key: "name", type: "text" },
                { label: "Email", key: "email", type: "email" },
                { label: "Mot de passe", key: "password", type: "password" },
                { label: "Téléphone", key: "tel", type: "text" },
                { label: "Direction", key: "direction", type: "text" },
                { label: "Image (URL)", key: "image", type: "text" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-xs text-gray-400 dark:text-slate-400 block mb-1">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
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
              <div className="col-span-2">
                <label className="text-xs text-gray-400 dark:text-slate-400 block mb-1">
                  Rôle
                </label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-slate-200 outline-none"
                >
                  <option>Analyste Business</option>
                  <option>Analyste Opérationnel</option>
                </select>
              </div>
            </div>
            <div className="bg-blue-50 dark:bg-slate-700 rounded-lg p-2.5 mt-3 mb-4 text-xs text-blue-600 dark:text-blue-300">
              📧 Les identifiants seront envoyés automatiquement par email.
            </div>
            <div className="flex gap-2">
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
                Créer & Envoyer
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
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-[550px] border border-gray-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium dark:text-slate-100">
                Modifier l'utilisateur
              </h3>
              <button
                onClick={() => setModalEdit(false)}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Nom complet", key: "name", type: "text" },
                { label: "Email", key: "email", type: "email" },
                {
                  label: "Nouveau mot de passe",
                  key: "password",
                  type: "password",
                },
                { label: "Téléphone", key: "telephone", type: "text" },
                {
                  label: "Date de naissance",
                  key: "date_naissance",
                  type: "date",
                },
                { label: "Poste", key: "poste", type: "text" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-xs text-gray-400 dark:text-slate-400 block mb-1">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    value={form[field.key]}
                    placeholder={
                      field.key === "password"
                        ? "Laisser vide pour ne pas changer"
                        : ""
                    }
                    onChange={(e) =>
                      setForm({ ...form, [field.key]: e.target.value })
                    }
                    className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-slate-200 outline-none"
                  />
                </div>
              ))}
              <div className="col-span-2">
                <label className="text-xs text-gray-400 dark:text-slate-400 block mb-1">
                  Adresse
                </label>
                <input
                  type="text"
                  value={form.adresse}
                  onChange={(e) =>
                    setForm({ ...form, adresse: e.target.value })
                  }
                  className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-slate-200 outline-none"
                />
              </div>
              <div className="col-span-2">
                <label className="text-xs text-gray-400 dark:text-slate-400 block mb-1">
                  Rôle
                </label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-slate-200 outline-none"
                >
                  <option>Administrateur</option>
                  <option>Analyste Business</option>
                  <option>Analyste Opérationnel</option>
                </select>
              </div>
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
              Supprimer l'utilisateur ?
            </h3>
            <p className="text-xs text-gray-400 dark:text-slate-400 mb-1">
              {selectedUser?.name}
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

export default Users;
