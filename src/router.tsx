import { Navigate, Route, Routes } from "react-router-dom";
import { BusquedaPage } from "@/pages/Busqueda";
import { CamaraPage } from "@/pages/Camara";
import { DashboardPage } from "@/pages/Dashboard";
import { VozPage } from "@/pages/Voz";
import { ProtectedRoute } from "./components/shared/ProtectedRoute";
import { EstadisticasPage } from "./pages/Estadisticas";
import { HistorialPage } from "./pages/Historial";
import { SesionPage } from "./pages/Session";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<SesionPage />} />
      <Route
        path="/camara"
        element={
          <ProtectedRoute>
            <CamaraPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/voz"
        element={
          <ProtectedRoute>
            <VozPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/busqueda"
        element={
          <ProtectedRoute>
            <BusquedaPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/historial"
        element={
          <ProtectedRoute>
            <HistorialPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/estadisticas"
        element={
          <ProtectedRoute>
            <EstadisticasPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
