import { z } from "zod";

export const activoSchema = z.object({
  nombre: z.string().nullable(),
  marca: z.string().nullable(),
  modelo: z.string().nullable(),
  tipo: z.string().nullable(),
  numero_serie: z.string().nullable(),
  estado: z.string().nullable(),
  ubicacion: z.string().nullable(),
  observaciones: z.string().nullable(),
});

export type ActivoFormValues = z.infer<typeof activoSchema>;
