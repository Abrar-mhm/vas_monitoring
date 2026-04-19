import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import SidebarOperationnel from "../../components/SidebarOperationnel";
import api from "../../api/axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


function Services() {
  const { dark } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [services, setServices] = useState([]);
  const [fournisseurs, setFournisseurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [form, setForm] = useState({
    NOM_FOURNISSEUR: "",
    NOM_SERVICE: "",
    NUMERO_COURT: "",
    KEYWORD: "",
    TYPE: "Service",
    PRIX: "",
    ACTIF: 1,
  });

  useEffect(() => {
    fetchServices();
    fetchFournisseurs();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get("/api/services");
      setServices(response.data);
    } catch (error) {
      console.error("Erreur chargement services", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFournisseurs = async () => {
    try {
      const response = await api.get("/api/fournisseurs");
      setFournisseurs(response.data);
    } catch (error) {
      console.error("Erreur chargement fournisseurs", error);
    }
  };

  const handleExportExcel = () => {
    const data = services.map((s) => ({
      ID: s.ID,
      Fournisseur: s.NOM_FOURNISSEUR,
      Service: s.NOM_SERVICE,
      "Numéro court": s.NUMERO_COURT,
      Keyword: s.KEYWORD,
      Type: s.TYPE,
      "Prix (DT)": s.PRIX,
      Statut: s.ACTIF === 1 ? "Actif" : "Inactif",
    }));
    const worksheet = XLSX.utils.json_to_sheet(
      data.length > 0 ? data : [{ "Aucune donnée": "" }],
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Services SMS+");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    const date = new Date().toLocaleDateString("fr-FR").replace(/\//g, "-");
    saveAs(blob, `Services_SMS_${date}.xlsx`);
  };

  const validate = () => {
    const errors = {};
    if (!form.NOM_FOURNISSEUR)
      errors.NOM_FOURNISSEUR = "Fournisseur obligatoire";
    if (!form.NOM_SERVICE) errors.NOM_SERVICE = "Nom service obligatoire";
    if (!form.NUMERO_COURT) errors.NUMERO_COURT = "Numéro court obligatoire";
    if (!form.KEYWORD) errors.KEYWORD = "Keyword obligatoire";
    if (!form.PRIX || isNaN(form.PRIX)) errors.PRIX = "Prix invalide";
    return errors;
  };

  const filtered = services.filter(
    (s) =>
      s.NOM_SERVICE?.toLowerCase().includes(search.toLowerCase()) ||
      s.NOM_FOURNISSEUR?.toLowerCase().includes(search.toLowerCase()) ||
      s.KEYWORD?.toLowerCase().includes(search.toLowerCase()),
  );

  const handleAdd = async () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    try {
      const response = await api.post("/api/services", {
        ...form,
        PRIX: parseFloat(form.PRIX),
      });
      setServices([...services, response.data]);
      setForm({
        NOM_FOURNISSEUR: "",
        NOM_SERVICE: "",
        NUMERO_COURT: "",
        KEYWORD: "",
        TYPE: "Service",
        PRIX: "",
        ACTIF: 1,
      });
      setFormErrors({});
      setModalAdd(false);
    } catch (error) {
      console.error("Erreur ajout service", error);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await api.put(`/api/services/${selectedService.ID}`, {
        ...form,
        PRIX: parseFloat(form.PRIX),
      });
      setServices(
        services.map((s) => (s.ID === selectedService.ID ? response.data : s)),
      );
      setModalEdit(false);
    } catch (error) {
      console.error("Erreur modification service", error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/api/services/${selectedService.ID}`);
      setServices(services.filter((s) => s.ID !== selectedService.ID));
      setModalDelete(false);
    } catch (error) {
      console.error("Erreur suppression service", error);
    }
  };

  const handleActiver = async (id) => {
    try {
      const response = await api.put(`/api/services/${id}/activer`);
      setServices(services.map((s) => (s.ID === id ? response.data : s)));
    } catch (error) {
      console.error("Erreur activation service", error);
    }
  };

  const handleDesactiver = async (id) => {
    try {
      const response = await api.put(`/api/services/${id}/desactiver`);
      setServices(services.map((s) => (s.ID === id ? response.data : s)));
    } catch (error) {
      console.error("Erreur désactivation service", error);
    }
  };

  const openEdit = (service) => {
    setSelectedService(service);
    setForm({
      NOM_FOURNISSEUR: service.NOM_FOURNISSEUR,
      NOM_SERVICE: service.NOM_SERVICE,
      NUMERO_COURT: service.NUMERO_COURT,
      KEYWORD: service.KEYWORD,
      TYPE: service.TYPE,
      PRIX: service.PRIX,
      ACTIF: service.ACTIF,
    });
    setModalEdit(true);
  };

  const openDelete = (service) => {
    setSelectedService(service);
    setModalDelete(true);
  };

  const ModalForm = ({ onSubmit, onClose, title, submitLabel }) => (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-96 border border-gray-200 dark:border-slate-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-medium dark:text-slate-100">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            ×
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-400 dark:text-slate-400 block mb-1">
              Fournisseur
            </label>
            <select
              value={form.NOM_FOURNISSEUR}
              onChange={(e) =>
                setForm({ ...form, NOM_FOURNISSEUR: e.target.value })
              }
              className={`w-full text-xs px-3 py-2 rounded-lg border bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-slate-200 outline-none ${formErrors.NOM_FOURNISSEUR ? "border-red-400" : "border-gray-200 dark:border-slate-600"}`}
            >
              <option value="">Sélectionner un fournisseur</option>
              {fournisseurs.map((f) => (
                <option key={f.ID} value={f.PROVIDER_NAME}>
                  {f.PROVIDER_NAME}
                </option>
              ))}
            </select>
            {formErrors.NOM_FOURNISSEUR && (
              <p className="text-red-500 text-xs mt-0.5">
                {formErrors.NOM_FOURNISSEUR}
              </p>
            )}
          </div>
          {[
            { label: "Nom service", key: "NOM_SERVICE" },
            { label: "Numéro court", key: "NUMERO_COURT" },
            { label: "Keyword", key: "KEYWORD" },
            { label: "Prix (DT)", key: "PRIX" },
          ].map((field) => (
            <div key={field.key}>
              <label className="text-xs text-gray-400 dark:text-slate-400 block mb-1">
                {field.label}
              </label>
              <input
                type={field.key === "PRIX" ? "number" : "text"}
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
          <div>
            <label className="text-xs text-gray-400 dark:text-slate-400 block mb-1">
              Type
            </label>
            <select
              value={form.TYPE}
              onChange={(e) => setForm({ ...form, TYPE: e.target.value })}
              className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-slate-200 outline-none"
            >
              <option>Service</option>
              <option>Premium</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={onClose}
            className="flex-1 py-2 text-xs rounded-lg border border-gray-200 dark:border-slate-600 text-gray-600 dark:text-slate-300"
          >
            Annuler
          </button>
          <button
            onClick={onSubmit}
            className="flex-1 py-2 text-xs rounded-lg text-white"
            style={{ background: "#0066CC" }}
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`flex h-screen ${dark ? "bg-slate-900 text-slate-100" : "bg-gray-100 text-gray-800"}`}
    >
      {sidebarOpen && <SidebarOperationnel />}

      <div className="flex-1 flex flex-col min-w-0">
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
          <div className="flex gap-2">
            <button
              onClick={handleExportExcel}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-white"
              style={{ background: "#16a34a" }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Exporter Excel
            </button>
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
              Ajouter service
            </button>
          </div>
        </div>

        <div className="p-5 flex-1 overflow-auto">
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
                {services.filter((s) => s.ACTIF === 1).length}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
              <p className="text-xs text-gray-400 dark:text-slate-400 mb-1">
                Inactifs
              </p>
              <p className="text-2xl font-medium text-red-500">
                {services.filter((s) => s.ACTIF === 0).length}
              </p>
            </div>
          </div>

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

            {loading ? (
              <div className="px-4 py-8 text-center text-xs text-gray-400">
                Chargement des services...
              </div>
            ) : filtered.length === 0 ? (
              <div className="px-4 py-8 text-center text-xs text-gray-400">
                Aucun service trouvé
              </div>
            ) : (
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
                      key={s.ID}
                      className="border-t border-gray-100 dark:border-slate-700"
                    >
                      <td className="px-4 py-3 text-xs text-gray-400">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3 text-xs font-medium text-gray-700 dark:text-slate-200">
                        {s.NOM_FOURNISSEUR}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-700 dark:text-slate-200">
                        {s.NOM_SERVICE}
                      </td>
                      <td className="px-4 py-3 text-xs font-mono text-blue-600">
                        {s.NUMERO_COURT}
                      </td>
                      <td className="px-4 py-3 text-xs font-mono text-gray-500">
                        {s.KEYWORD}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500">
                        {s.TYPE}
                      </td>
                      <td className="px-4 py-3 text-xs font-medium text-gray-700 dark:text-slate-200">
                        {s.PRIX} DT
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${s.ACTIF === 1 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                        >
                          {s.ACTIF === 1 ? "Actif" : "Inactif"}
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
                          {s.ACTIF === 1 ? (
                            <button
                              onClick={() => handleDesactiver(s.ID)}
                              className="text-xs px-2 py-1 rounded-lg border border-orange-200 text-orange-600 bg-orange-50 hover:bg-orange-100"
                            >
                              Désactiver
                            </button>
                          ) : (
                            <button
                              onClick={() => handleActiver(s.ID)}
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
            )}
          </div>
        </div>
      </div>

      {modalAdd && (
        <ModalForm
          onSubmit={handleAdd}
          onClose={() => setModalAdd(false)}
          title="Ajouter un service"
          submitLabel="Ajouter"
        />
      )}
      {modalEdit && (
        <ModalForm
          onSubmit={handleEdit}
          onClose={() => setModalEdit(false)}
          title="Modifier le service"
          submitLabel="Modifier"
        />
      )}

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
              {selectedService?.NOM_SERVICE}
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
