import { z } from "zod";

export const sesionSchema = z.object({
  pabellon: z.string().min(1, "El pabellón es requerido"),
  laboratorio: z.string().min(1, "El laboratorio es requerido"),
  armario: z.string().nullable(),
});

export type SesionFormValues = z.infer<typeof sesionSchema>;
