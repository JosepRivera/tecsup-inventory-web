import { useState } from "react";
import { confirmarOCR, escanearEtiqueta } from "@/api/ocr";
import type { ActivoCreate, OCRResponse } from "@/types";

export const useOCR = () => {
  const [resultado, setResultado] = useState<OCRResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const escanear = async (imagen: File) => {
    try {
      setLoading(true);
      setError(null);
      setResultado(null);
      const res = await escanearEtiqueta(imagen);
      setResultado(res);
    } catch {
      setError("No se pudo procesar la imagen");
    } finally {
      setLoading(false);
    }
  };

  const confirmar = async (activo: ActivoCreate): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await confirmarOCR(activo);
      setResultado(null);
      return true;
    } catch {
      setError("No se pudo guardar el activo");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const limpiar = () => {
    setResultado(null);
    setError(null);
  };

  return { resultado, loading, error, escanear, confirmar, limpiar };
};
