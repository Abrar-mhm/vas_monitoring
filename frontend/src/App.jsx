import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Users from "./pages/admin/Users";
import Notifications from "./pages/admin/Notifications";
import Settings from "./pages/admin/Settings";
import DashboardOperationnel from "./pages/operationnel/Dashboard";
import Alertes from "./pages/operationnel/Alertes";
import Database from "./pages/admin/Database";
import FTP from "./pages/admin/FTP";
import SuiviCDR from "./pages/operationnel/SuiviCDR";
import Services from "./pages/operationnel/Services";
import DashboardBusiness from "./pages/business/Dashboard";
import Recherche from "./pages/business/Recherche";
import AlertesBusiness from "./pages/business/Alertes";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/notifications" element={<Notifications />} />
        <Route path="/admin/settings" element={<Settings />} />
        <Route
          path="/operationnel/dashboard"
          element={<DashboardOperationnel />}
        />
        <Route path="/operationnel/alertes" element={<Alertes />} />
        <Route path="/admin/database" element={<Database />} />
        <Route path="/admin/ftp" element={<FTP />} />
        <Route path="/operationnel/suivi-cdr" element={<SuiviCDR />} />
        <Route path="/operationnel/services" element={<Services />} />
        <Route path="/business/dashboard" element={<DashboardBusiness />} />
        <Route path="/business/recherche" element={<Recherche />} />
        <Route path="/business/alertes" element={<AlertesBusiness />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
