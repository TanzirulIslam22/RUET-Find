import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import HomePage from "./features/pages/HomePage";
import BrowsePage from "./features/pages/BrowsePage";
import ItemDetailPage from "./features/pages/ItemDetailPage";
import ReportItemPage from "./features/pages/ReportItemPage";
import CampusMapPage from "./features/pages/CampusMapPage";
import SmartMatchPage from "./features/pages/SmartMatchPage";
import AuthPage from "./features/pages/AuthPage";
import HowItWorksPage from "./features/pages/HowItWorksPage";
import AdminDashboard from "./features/admin/AdminDashboard";

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  return token ? children : <Navigate to="/auth" replace />;
};

const AdminRoute = ({ children }) => {
  const { user, token } = useSelector((state) => state.auth);
  return token && user?.role === "admin" ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="browse" element={<BrowsePage />} />
        <Route path="item/:id" element={<ItemDetailPage />} />
        <Route path="map" element={<CampusMapPage />} />
        <Route path="match/:id" element={<SmartMatchPage />} />
        <Route path="how-it-works" element={<HowItWorksPage />} />
        <Route
          path="report"
          element={
            <ProtectedRoute>
              <ReportItemPage />
            </ProtectedRoute>
          }
        />
        <Route path="auth" element={<AuthPage />} />
      </Route>
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
