import { CheckCircle, XCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { FormField } from "@/components/shared/FormField";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ActivoResponse } from "@/types";

interface EditActivoDialogProps {
  activo: ActivoResponse | null;
  open: boolean;
  onClose: () => void;
  onConfirm: (id: number, data: Partial<ActivoResponse>) => void;
  loading?: boolean;
}

export const EditActivoDialog = ({
  activo,
  open,
  onClose,
  onConfirm,
  loading,
}: EditActivoDialogProps) => {
  const { register, handleSubmit } = useForm<ActivoResponse>({
    values: activo ?? ({} as ActivoResponse),
  });

  const onSubmit = (data: ActivoResponse) => {
    if (activo) {
      onConfirm(activo.id, data);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={(v) => !v && onClose()}>
      <AlertDialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>Editar Activo</AlertDialogTitle>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 py-2">
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

          <FormField label="Estado">
            <Input {...register("estado")} placeholder="Bueno, Regular, Malo" />
          </FormField>

          <FormField label="Ubicación">
            <Input {...register("ubicacion")} />
          </FormField>

          <FormField label="Observaciones">
            <Textarea {...register("observaciones")} rows={3} />
          </FormField>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
              disabled={loading}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
            <Button type="submit" className="flex-1" disabled={loading}>
              <CheckCircle className="mr-2 h-4 w-4" />
              {loading ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
