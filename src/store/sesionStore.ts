import { create } from "zustand";
import type { SesionResponse } from "@/types";

interface SesionStore {
  sesion: SesionResponse | null;
  setSesion: (sesion: SesionResponse | null) => void;
  actualizarContexto: (data: Partial<SesionResponse>) => void;
  cerrarSesion: () => void;
}

export const useSesionStore = create<SesionStore>((set) => ({
  sesion: null,

  setSesion: (sesion) => set({ sesion }),

  actualizarContexto: (data) =>
    set((state) => ({
      sesion: state.sesion ? { ...state.sesion, ...data } : null,
    })),

  cerrarSesion: () => set({ sesion: null }),
}));
