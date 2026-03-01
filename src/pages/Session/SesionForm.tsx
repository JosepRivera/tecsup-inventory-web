import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { FormField } from "@/components/shared/FormField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useSesion } from "@/hooks/useSesion";
import type { SesionFormValues } from "@/schemas/sesion.schema";
import type { SesionCreate } from "@/types";
import { sesionSchema } from "@/schemas/sesion.schema";

const PABELLONES = ["Pabellón A", "Pabellón B", "Pabellón C", "Pabellón D", "Pabellón E", "Pabellón F", "Pabellón G", "Otro"];
const LABORATORIOS = ["Laboratorio 1", "Laboratorio 2", "Laboratorio 3", "Laboratorio 4", "Laboratorio 5", "Laboratorio 6", "Sala Cisco", "Centro de Cómputo", "Otro"];

export const SesionForm = () => {
  const { iniciar, loading } = useSesion();
  const [otroPabellon, setOtroPabellon] = useState(false);
  const [otroLab, setOtroLab] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SesionFormValues>({
    resolver: zodResolver(sesionSchema),
    defaultValues: {
      tecnico: localStorage.getItem("tecnico_nombre") || "",
      pabellon: "",
      laboratorio: "",
      armario: "",
    },
  });

  const onSubmit = async (data: SesionFormValues) => {
    localStorage.setItem("tecnico_nombre", data.tecnico);
    await iniciar({
      ...data,
      armario: data.armario || null,
    } as SesionCreate);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <FormField label="Tu Nombre y Apellido" required error={errors.tecnico?.message}>
        <Input 
          placeholder="Ej: Juan Pérez" 
          className="h-12 rounded-xl"
          {...register("tecnico")}
        />
      </FormField>

      <div className="h-px bg-border my-2" />

      <FormField label="Pabellón" required error={errors.pabellon?.message}>
        <Controller
          control={control}
          name="pabellon"
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <Select 
                onValueChange={(val) => {
                  if (val === "Otro") {
                    setOtroPabellon(true);
                    field.onChange("");
                  } else {
                    setOtroPabellon(false);
                    field.onChange(val);
                  }
                }} 
                value={otroPabellon ? "Otro" : field.value}
              >
                <SelectTrigger className="h-12 w-full rounded-xl">
                  <SelectValue placeholder="Selecciona pabellón" />
                </SelectTrigger>
                <SelectContent>
                  {PABELLONES.map((p) => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {otroPabellon && (
                <Input 
                  placeholder="Escribe el pabellón" 
                  className="h-12 rounded-xl"
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            </div>
          )}
        />
      </FormField>

      <FormField label="Laboratorio" required error={errors.laboratorio?.message}>
        <Controller
          control={control}
          name="laboratorio"
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <Select 
                onValueChange={(val) => {
                  if (val === "Otro") {
                    setOtroLab(true);
                    field.onChange("");
                  } else {
                    setOtroLab(false);
                    field.onChange(val);
                  }
                }} 
                value={otroLab ? "Otro" : field.value}
              >
                <SelectTrigger className="h-12 w-full rounded-xl">
                  <SelectValue placeholder="Selecciona laboratorio" />
                </SelectTrigger>
                <SelectContent>
                  {LABORATORIOS.map((l) => (
                    <SelectItem key={l} value={l}>{l}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {otroLab && (
                <Input 
                  placeholder="Escribe el laboratorio" 
                  className="h-12 rounded-xl"
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            </div>
          )}
        />
      </FormField>

      <FormField label="Armario / Fila" error={errors.armario?.message}>
        <Input 
          placeholder="Ej: Armario 1, Fila A..." 
          {...register("armario")} 
          className="h-12 rounded-xl"
        />
      </FormField>

      <Button type="submit" className="mt-4 h-14 w-full rounded-2xl text-lg font-bold shadow-lg shadow-primary/20" disabled={loading}>
        {loading ? "Iniciando..." : "Iniciar jornada"}
      </Button>
    </form>
  );
};
