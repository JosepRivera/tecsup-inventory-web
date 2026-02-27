import type { ActivoCreate, ActivoResponse, OCRResponse } from "@/types";
import client from "./client";

export const escanearEtiqueta = async (imagen: File): Promise<OCRResponse> => {
  const formData = new FormData();
  formData.append("imagen", imagen);

  const res = await client.post<OCRResponse>("/api/ocr/escanear-etiqueta", formData);
  return res.data;
};

export const confirmarOCR = async (activo: ActivoCreate): Promise<ActivoResponse> => {
  const res = await client.post<ActivoResponse>("/api/ocr/confirmar", activo);
  return res.data;
};
