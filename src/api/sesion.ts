import type { SesionCreate, SesionResponse, SesionUpdate } from "@/types";
import client from "./client";

export const iniciarSesion = async (data: SesionCreate): Promise<SesionResponse> => {
  const res = await client.post<SesionResponse>("/api/sesion/iniciar", data);
  return res.data;
};

export const obtenerContexto = async (): Promise<SesionResponse> => {
  const res = await client.get<SesionResponse>("/api/sesion/contexto");
  return res.data;
};

export const actualizarContexto = async (data: SesionUpdate): Promise<SesionResponse> => {
  const res = await client.patch<SesionResponse>("/api/sesion/contexto", data);
  return res.data;
};

export const cerrarSesion = async (): Promise<void> => {
  await client.post("/api/sesion/cerrar");
};
