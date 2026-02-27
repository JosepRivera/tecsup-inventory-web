import type { ActivoResponse } from "@/types";
import client from "./client";

export const buscar = async (q: string): Promise<ActivoResponse[]> => {
  const res = await client.get<ActivoResponse[]>("/api/busqueda", { params: { q } });
  return res.data;
};
