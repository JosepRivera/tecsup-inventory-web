import { z } from "zod";

export const sesionSchema = z.object({
  tecnico: z.string().min(3, "Ingresa tu nombre y apellido"),
  pabellon: z.string().min(1, "El pabellón es requerido"),
  laboratorio: z.string().min(1, "El laboratorio es requerido"),
  armario: z.string().optional(),
});

export type SesionFormValues = z.infer<typeof sesionSchema>;
