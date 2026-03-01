import { useCallback, useState } from "react";
import { actualizarContexto, cerrarSesion, iniciarSesion, obtenerContexto } from "@/api/sesion";
import { useSesionStore } from "@/store/sesionStore";
import type { SesionCreate, SesionUpdate } from "@/types";

export const useSesion = () => {
  const {
    sesion,
    setSesion,
    actualizarContexto: actualizarStore,
    cerrarSesion: cerrarStore,
  } = useSesionStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const iniciar = useCallback(
    async (data: SesionCreate) => {
      try {
        setLoading(true);
        setError(null);
        const res = await iniciarSesion(data);
        setSesion(res);
      } catch {
        setError("No se pudo iniciar la sesión");
      } finally {
        setLoading(false);
      }
    },
    [setSesion],
  );

  const cargarContexto = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await obtenerContexto();
      setSesion(res);
    } catch {
      // Ignoramos el error aquí porque es normal no tener sesión al inicio
      setSesion(null);
    } finally {
      setLoading(false);
    }
  }, [setSesion]);

  const actualizar = useCallback(
    async (data: SesionUpdate) => {
      try {
        setLoading(true);
        setError(null);
        const res = await actualizarContexto(data);
        actualizarStore(res);
      } catch {
        setError("No se pudo actualizar el contexto");
      } finally {
        setLoading(false);
      }
    },
    [actualizarStore],
  );

  const cerrar = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await cerrarSesion();
      cerrarStore();
    } catch {
      setError("No se pudo cerrar la sesión");
    } finally {
      setLoading(false);
    }
  }, [cerrarStore]);

  return { sesion, loading, error, iniciar, cargarContexto, actualizar, cerrar };
};
