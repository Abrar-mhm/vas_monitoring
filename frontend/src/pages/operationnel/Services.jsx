import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import SidebarOperationnel from "../../components/SidebarOperationnel";


const initialServices = [
  {
    id: 1,
    fournisseur: "TOPNET",
    service: "YOUSCRIBE",
    numero: "853771",
    keyword: "_N",
    type: "Service",
    prix: 0.35,
    actif: true,
  },
  {
    id: 2,
    fournisseur: "TOPNET",
    service: "YOUSCRIBE",
    numero: "853772",
    keyword: "_N",
    type: "Service",
    prix: 1.8,
    actif: true,
  },
  {
    id: 3,
    fournisseur: "TOPNET",
    service: "YOUSCRIBE",
    numero: "853773",
    keyword: "_N",
    type: "Service",
    prix: 4.5,
    actif: true,
  },
  {
    id: 4,
    fournisseur: "TOPNET",
    service: "PLAY VOD",
    numero: "855201",
    keyword: "_N",
    type: "Service",
    prix: 0.5,
    actif: true,
  },
  {
    id: 5,
    fournisseur: "TOPNET",
    service: "PLAY VOD",
    numero: "855202",
    keyword: "_N",
    type: "Service",
    prix: 3.5,
    actif: false,
  },
  {
    id: 6,
    fournisseur: "TOPNET",
    service: "OUKLA BY TT",
    numero: "8000",
    keyword: "ouk1",
    type: "Service",
    prix: 0.5,
    actif: true,
  },
  {
    id: 7,
    fournisseur: "TOPNET",
    service: "FUZE FORGE",
    numero: "8000",
    keyword: "fuz1",
    type: "Service",
    prix: 0.7,
    actif: true,
  },
  {
    id: 8,
    fournisseur: "TOPNET",
    service: "FUZE FORGE",
    numero: "8000",
    keyword: "fuz2",
    type: "Service",
    prix: 3.0,
    actif: false,
  },
];

function Services() {
  const { dark } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [services, setServices] = useState(initialServices);
  const [search, setSearch] = useState("");
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [form, setForm] = useState({
    fournisseur: "",
    service: "",
    numero: "",
    keyword: "",
    type: "Service",
    prix: "",
    actif: true,
  });

  const filtered = services.filter(
    (s) =>
      s.service.toLowerCase().includes(search.toLowerCase()) ||
      s.fournisseur.toLowerCase().includes(search.toLowerCase()) ||
      s.keyword.toLowerCase().includes(search.toLowerCase()),
  );

  const handleAdd = () => {
    setServices([
      ...services,
      { id: Date.now(), ...form, prix: parseFloat(form.prix) },
    ]);
    setForm({
      fournisseur: "",
      service: "",
      numero: "",
      keyword: "",
      type: "Service",
      prix: "",
      actif: true,
    });
    setModalAdd(false);
  };

  const handleEdit = () => {
    setServices(
      services.map((s) =>
        s.id === selectedService.id
          ? { ...s, ...form, prix: parseFloat(form.prix) }
          : s,
      ),
    );
    setModalEdit(false);
  };

  const handleDelete = () => {
    setServices(services.filter((s) => s.id !== selectedService.id));
    setModalDelete(false);
  };

  const handleActiver = (id) => {
    setServices(services.map((s) => (s.id === id ? { ...s, actif: true } : s)));
  };

  const handleDesactiver = (id) => {
    setServices(
      services.map((s) => (s.id === id ? { ...s, actif: false } : s)),
    );
  };

  const openEdit = (service) => {
    setSelectedService(service);
    setForm({
      fournisseur: service.fournisseur,
      service: service.service,
      numero: service.numero,
      keyword: service.keyword,
      type: service.type,
      prix: service.prix,
      actif: service.actif,
    });
    setModalEdit(true);
  };

  const openDelete = (service) => {
    setSelectedService(service);
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
              Gestion des Services SMS+
            </h2>
            <p className="text-xs text-gray-400 dark:text-slate-400">
              {services.length} services enregistrés
            </p>
          </div>
          <button
            onClick={() => setModalAdd(true)}
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
            Ajouter service
          </button>
        </div>

        <div className="p-5 flex-1 overflow-auto">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
              <p className="text-xs text-gray-400 dark:text-slate-400 mb-1">
                Total services
              </p>
              <p className="text-2xl font-medium text-blue-600">
                {services.length}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
              <p className="text-xs text-gray-400 dark:text-slate-400 mb-1">
                Actifs
              </p>
              <p className="text-2xl font-medium text-green-500">
                {services.filter((s) => s.actif).length}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
              <p className="text-xs text-gray-400 dark:text-slate-400 mb-1">
                Inactifs
              </p>
              <p className="text-2xl font-medium text-red-500">
                {services.filter((s) => !s.actif).length}
              </p>
            </div>
          </div>

          {/* Tableau */}
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100 dark:border-slate-700">
              <p className="text-sm font-medium text-gray-700 dark:text-slate-200">
                Liste des services
              </p>
              <input
                type="text"
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-slate-200 outline-none w-40"
              />
            </div>
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-slate-900 text-xs text-gray-400 dark:text-slate-400">
                  <th className="text-left px-4 py-3 font-medium">N°</th>
                  <th className="text-left px-4 py-3 font-medium">
                    Fournisseur
                  </th>
                  <th className="text-left px-4 py-3 font-medium">Service</th>
                  <th className="text-left px-4 py-3 font-medium">Numéro</th>
                  <th className="text-left px-4 py-3 font-medium">Keyword</th>
                  <th className="text-left px-4 py-3 font-medium">Type</th>
                  <th className="text-left px-4 py-3 font-medium">Prix</th>
                  <th className="text-left px-4 py-3 font-medium">Statut</th>
                  <th className="text-left px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, index) => (
                  <tr
                    key={s.id}
                    className="border-t border-gray-100 dark:border-slate-700"
                  >
                    <td className="px-4 py-3 text-xs text-gray-400 dark:text-slate-500">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 text-xs font-medium text-gray-700 dark:text-slate-200">
                      {s.fournisseur}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-700 dark:text-slate-200">
                      {s.service}
                    </td>
                    <td className="px-4 py-3 text-xs font-mono text-blue-600">
                      {s.numero}
                    </td>
                    <td className="px-4 py-3 text-xs font-mono text-gray-500 dark:text-slate-400">
                      {s.keyword}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500 dark:text-slate-400">
                      {s.type}
                    </td>
                    <td className="px-4 py-3 text-xs font-medium text-gray-700 dark:text-slate-200">
                      {s.prix} DT
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${s.actif ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                      >
                        {s.actif ? "Actif" : "Inactif"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => openEdit(s)}
                          className="text-xs px-2 py-1 rounded-lg border border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100"
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => openDelete(s)}
                          className="text-xs px-2 py-1 rounded-lg border border-red-200 text-red-600 bg-red-50 hover:bg-red-100"
                        >
                          Supprimer
                        </button>
                        {s.actif ? (
                          <button
                            onClick={() => handleDesactiver(s.id)}
                            className="text-xs px-2 py-1 rounded-lg border border-orange-200 text-orange-600 bg-orange-50 hover:bg-orange-100"
                          >
                            Désactiver
                          </button>
                        ) : (
                          <button
                            onClick={() => handleActiver(s.id)}
                            className="text-xs px-2 py-1 rounded-lg border border-green-200 text-green-600 bg-green-50 hover:bg-green-100"
                          >
                            Activer
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                Ajouter un service
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
                { label: "Fournisseur", key: "fournisseur" },
                { label: "Service", key: "service" },
                { label: "Numéro", key: "numero" },
                { label: "Keyword", key: "keyword" },
                { label: "Prix (DT)", key: "prix" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-xs text-gray-400 dark:text-slate-400 block mb-1">
                    {field.label}
                  </label>
                  <input
                    type={field.key === "prix" ? "number" : "text"}
                    value={form[field.key]}
                    onChange={(e) =>
                      setForm({ ...form, [field.key]: e.target.value })
                    }
                    className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-slate-200 outline-none"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs text-gray-400 dark:text-slate-400 block mb-1">
                  Type
                </label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-slate-200 outline-none"
                >
                  <option>Service</option>
                  <option>Premium</option>
                </select>
              </div>
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
                Modifier le service
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
                { label: "Fournisseur", key: "fournisseur" },
                { label: "Service", key: "service" },
                { label: "Numéro", key: "numero" },
                { label: "Keyword", key: "keyword" },
                { label: "Prix (DT)", key: "prix" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-xs text-gray-400 dark:text-slate-400 block mb-1">
                    {field.label}
                  </label>
                  <input
                    type={field.key === "prix" ? "number" : "text"}
                    value={form[field.key]}
                    onChange={(e) =>
                      setForm({ ...form, [field.key]: e.target.value })
                    }
                    className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-slate-200 outline-none"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs text-gray-400 dark:text-slate-400 block mb-1">
                  Type
                </label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-slate-200 outline-none"
                >
                  <option>Service</option>
                  <option>Premium</option>
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
              Supprimer le service ?
            </h3>
            <p className="text-xs text-gray-400 dark:text-slate-400 mb-1">
              {selectedService?.service}
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

export default Services;
