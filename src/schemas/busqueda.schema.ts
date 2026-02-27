import { z } from "zod";

export const busquedaSchema = z.object({
  q: z.string().min(1, "Ingresa un término de búsqueda"),
});

export type BusquedaFormValues = z.infer<typeof busquedaSchema>;
