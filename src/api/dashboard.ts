import type { ActivoResponse, DashboardResumen } from "@/types";
import client from "./client";

export const obtenerActivos = async (): Promise<ActivoResponse[]> => {
  const res = await client.get<ActivoResponse[]>("/api/dashboard/activos");
  return res.data;
};

export const obtenerResumen = async (): Promise<DashboardResumen> => {
  const res = await client.get<DashboardResumen>("/api/dashboard/resumen");
  return res.data;
};

export const eliminarActivo = async (id: number): Promise<void> => {
  await client.delete(`/api/dashboard/activos/${id}`);
};
