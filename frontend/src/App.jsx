import { BrowserRouter, Routes, Route , Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Users from "./pages/admin/Users";
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
import Fournisseurs from "./pages/operationnel/Fournisseurs";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/admin/users" element={<ProtectedRoute role="Administrateur"><Users /></ProtectedRoute>} />
        <Route path="/admin/database" element={<ProtectedRoute role="Administrateur"><Database /></ProtectedRoute>} />
        <Route path="/admin/ftp" element={<ProtectedRoute role="Administrateur"><FTP /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute role="Administrateur"><Settings /></ProtectedRoute>} />

        <Route path="/business/dashboard" element={<ProtectedRoute role="Analyste Business"><DashboardBusiness /></ProtectedRoute>} />
        <Route path="/business/recherche" element={<ProtectedRoute role="Analyste Business"><Recherche /></ProtectedRoute>} />
        <Route path="/business/alertes" element={<ProtectedRoute role="Analyste Business"><AlertesBusiness /></ProtectedRoute>} />

        <Route path="/operationnel/dashboard" element={<ProtectedRoute role="Analyste Opérationnel"><DashboardOperationnel /></ProtectedRoute>} />
        <Route path="/operationnel/alertes" element={<ProtectedRoute role="Analyste Opérationnel"><Alertes /></ProtectedRoute>} />
        <Route path="/operationnel/suivi-cdr" element={<ProtectedRoute role="Analyste Opérationnel"><SuiviCDR /></ProtectedRoute>} />
        <Route path="/operationnel/services" element={<ProtectedRoute role="Analyste Opérationnel"><Services /></ProtectedRoute>} />
        <Route path="/operationnel/fournisseurs" element={<ProtectedRoute role="Analyste Opérationnel"><Fournisseurs /></ProtectedRoute>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
