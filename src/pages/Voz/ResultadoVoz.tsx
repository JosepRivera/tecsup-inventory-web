import { CheckCircle, Search, XCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { FormField } from "@/components/shared/FormField";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ActivoCreate, ActivoResponse, VozResponse } from "@/types";

interface ResultadoVozProps {
  resultado: VozResponse;
  loading: boolean;
  onConfirmar: (activo: ActivoCreate) => void;
  onCancelar: () => void;
}

export const ResultadoVoz = ({
  resultado,
  loading,
  onConfirmar,
  onCancelar,
}: ResultadoVozProps) => {
  const { register, handleSubmit } = useForm<ActivoCreate>({
    values: {
      nombre: resultado.nombre ?? "",
      marca: resultado.marca ?? "",
      modelo: resultado.modelo ?? "",
      tipo: resultado.tipo ?? "",
      numero_serie: resultado.numero_serie ?? "",
      estado: null,
      ubicacion: null,
      observaciones: resultado.observaciones ?? "",
      sesion_id: null,
      origen: "voz",
    },
  });

  if (resultado.es_consulta) {
    return (
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between border-b border-border/40 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-primary/10 rounded-lg">
              <Search className="h-4 w-4 text-primary" />
            </div>
            <p className="text-sm font-bold text-foreground/80">Resultados del Dictado</p>
          </div>
          <Button variant="outline" size="sm" onClick={onCancelar} className="h-9 rounded-xl border-primary/20 hover:bg-primary/5 text-primary font-bold">
            <Search className="mr-2 h-4 w-4" />
            Nueva consulta
          </Button>
        </div>

        <div className="bg-secondary/30 p-4 rounded-2xl border border-border/20 italic text-sm text-foreground/70 relative">
          <span className="absolute -top-2.5 left-4 bg-background px-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Lo que entendí</span>
          "{resultado.transcripcion}"
        </div>

        {resultado.resultados && resultado.resultados.length > 0 ? (
          <div className="flex flex-col gap-3">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">
              {resultado.resultados.length} EQUIPO(S) IDENTIFICADO(S)
            </p>
            <div className="grid grid-cols-1 gap-3">
              {resultado.resultados.map((activo: ActivoResponse) => (
                <Card key={activo.id} className="overflow-hidden border-border/40 shadow-sm">
                  <CardHeader className="pb-2 pt-4 group">
                    <CardTitle className="text-sm font-bold flex items-center justify-between">
                      {activo.nombre ?? "Sin nombre"}
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="flex flex-wrap gap-1.5">
                      {activo.marca && <Badge variant="secondary" className="text-[10px] font-bold">{activo.marca}</Badge>}
                      {activo.tipo && <Badge variant="outline" className="text-[10px]">{activo.tipo}</Badge>}
                      {activo.estado && (
                        <Badge className="text-[10px] bg-primary/10 text-primary border-none font-bold">
                          {activo.estado}
                        </Badge>
                      )}
                    </div>
                    {activo.ubicacion && (
                      <p className="mt-3 text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                        {activo.ubicacion}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-center">
            <XCircle className="h-10 w-10 text-destructive/40 mx-auto mb-3" />
            <p className="text-sm font-bold text-destructive">No se encontraron equipos</p>
            <p className="text-xs text-destructive/70 mt-1 max-w-[200px] mx-auto">
              No hallamos nada para <strong>"{resultado.query_busqueda}"</strong> en el inventario actual.
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onConfirmar)} className="flex flex-col gap-4">
      <div className="rounded-md bg-muted px-3 py-2">
        <p className="text-xs text-muted-foreground">Audio transcrito:</p>
        <p className="text-sm italic">"{resultado.transcripcion}"</p>
      </div>

      <p className="text-sm text-muted-foreground">
        La IA ha extraído y estructurado estos datos. Revisa y corrige si es necesario:
      </p>

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
