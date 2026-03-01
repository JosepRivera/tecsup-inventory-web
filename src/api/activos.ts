import type { ActivoBase, ActivoResponse } from "@/types";
import client from "./client";

export const obtenerTodosLosActivos = async (p: number = 1, size: number = 20): Promise<ActivoResponse[]> => {
  const res = await client.get<ActivoResponse[]>("/api/activos", {
    params: { p, size }
  });
  return res.data;
};

export const obtenerActivo = async (id: number): Promise<ActivoResponse> => {
  const res = await client.get<ActivoResponse>(`/api/activos/${id}`);
  return res.data;
};

export const actualizarActivo = async (
  id: number,
  data: Partial<ActivoBase>,
): Promise<ActivoResponse> => {
  const res = await client.patch<ActivoResponse>(`/api/activos/${id}`, data);
  return res.data;
};

export const eliminarActivoPermanente = async (id: number): Promise<void> => {
  await client.delete(`/api/activos/${id}`);
};
