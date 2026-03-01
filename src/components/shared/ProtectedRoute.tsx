import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { obtenerContexto } from "@/api/sesion";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { useSesionStore } from "@/store/sesionStore";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { sesion, setSesion } = useSesionStore();
  const [verificando, setVerificando] = useState(true);

  useEffect(() => {
    const verificar = async () => {
      try {
        const res = await obtenerContexto();
        setSesion(res);
      } catch {
        setSesion(null);
      } finally {
        setVerificando(false);
      }
    };

    if (!sesion) {
      verificar();
    } else {
      setVerificando(false);
    }
  }, [sesion, setSesion]);

  if (verificando) {
    return <LoadingSpinner />;
  }

  if (!sesion?.activa) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
