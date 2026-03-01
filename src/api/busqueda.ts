import type { ActivoResponse } from "@/types";
import client from "./client";

export const buscar = async (q: string, p: number = 1, size: number = 20): Promise<ActivoResponse[]> => {
  const res = await client.get<ActivoResponse[]>("/api/busqueda", { 
    params: { q, p, size } 
  });
  return res.data;
};
