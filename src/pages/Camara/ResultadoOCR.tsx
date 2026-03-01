import { CheckCircle, XCircle } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormField } from "@/components/shared/FormField";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ActivoCreate, OCRResponse } from "@/types";

interface ResultadoOCRProps {
  resultado: OCRResponse;
  loading: boolean;
  onConfirmar: (activo: ActivoCreate) => void;
  onCancelar: () => void;
}

export const ResultadoOCR = ({
  resultado,
  loading,
  onConfirmar,
  onCancelar,
}: ResultadoOCRProps) => {
  const { register, handleSubmit, reset } = useForm<ActivoCreate>({
    defaultValues: {
      nombre: resultado.nombre,
      marca: resultado.marca,
      modelo: resultado.modelo,
      tipo: resultado.tipo,
      numero_serie: resultado.numero_serie,
      observaciones: resultado.observaciones,
      estado: null,
      ubicacion: null,
      sesion_id: null,
      origen: "ocr",
    },
  });

  useEffect(() => {
    reset({
      nombre: resultado.nombre,
      marca: resultado.marca,
      modelo: resultado.modelo,
      tipo: resultado.tipo,
      numero_serie: resultado.numero_serie,
      observaciones: resultado.observaciones,
      estado: null,
      ubicacion: null,
      sesion_id: null,
      origen: "ocr",
    });
  }, [resultado, reset]);

  const confianzaVariant =
    resultado.confianza === "alta"
      ? "default"
      : resultado.confianza === "media"
        ? "secondary"
        : "destructive";

  return (
    <form onSubmit={handleSubmit(onConfirmar)} className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Revisa y corrige si es necesario</p>
        {resultado.confianza && (
          <Badge variant={confianzaVariant}>Confianza: {resultado.confianza}</Badge>
        )}
      </div>

      {resultado.texto_raw && (
        <div className="rounded-md bg-muted px-3 py-2">
          <p className="text-xs text-muted-foreground">Texto detectado:</p>
          <p className="text-xs font-mono">{resultado.texto_raw}</p>
        </div>
      )}

      <FormField label="Nombre">
        <Input {...register("nombre")} />
      </FormField>

      <FormField label="Marca">
        <Input {...register("marca")} />
      </FormField>

      <FormField label="Modelo">
        <Input {...register("modelo")} />
      </FormField>

      <FormField label="Tipo">
        <Input {...register("tipo")} />
      </FormField>

      <FormField label="Número de serie">
        <Input {...register("numero_serie")} />
      </FormField>

      <FormField label="Observaciones">
        <Textarea {...register("observaciones")} rows={3} />
      </FormField>

      <div className="flex gap-2 pt-2">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onCancelar}
          disabled={loading}
        >
          <XCircle className="mr-2 h-4 w-4" />
          Cancelar
        </Button>
        <Button type="submit" className="flex-1" disabled={loading}>
          <CheckCircle className="mr-2 h-4 w-4" />
          {loading ? "Guardando..." : "Confirmar"}
        </Button>
      </div>
    </form>
  );
};
