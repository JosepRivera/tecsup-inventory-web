import type { ActivoCreate, ActivoResponse, VozResponse } from "@/types";
import client from "./client";

export const dictar = async (audio: Blob): Promise<VozResponse> => {
  const formData = new FormData();
  formData.append("audio", audio, "grabacion.webm");

  const res = await client.post<VozResponse>("/api/voz/dictar", formData);
  return res.data;
};

export const confirmarVoz = async (activo: ActivoCreate): Promise<ActivoResponse> => {
  const res = await client.post<ActivoResponse>("/api/voz/confirmar", activo);
  return res.data;
};
