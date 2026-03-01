import { Edit2, MapPin, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ActivoResponse } from "@/types";

interface ActivoCardProps {
  activo: ActivoResponse;
  onEliminar?: (id: number) => void;
  onEdit?: (activo: ActivoResponse) => void;
}

export const ActivoCard = ({ activo, onEliminar, onEdit }: ActivoCardProps) => {
  return (
    <Card className="overflow-hidden border-border/50 shadow-sm transition-all hover:shadow-md active:scale-[0.98]">
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-sm font-bold leading-tight flex-1">
            {activo.nombre ?? "Sin nombre"}
          </CardTitle>
          <div className="flex gap-2">
            {onEdit && (
              <Button
                variant="secondary"
                size="icon"
                className="h-9 w-9 shrink-0 bg-secondary/50 hover:bg-primary/10 hover:text-primary transition-colors rounded-xl"
                onClick={() => onEdit(activo)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            )}
            {onEliminar && (
              <Button
                variant="secondary"
                size="icon"
                className="h-9 w-9 shrink-0 bg-secondary/50 hover:bg-destructive/10 hover:text-destructive transition-colors rounded-xl"
                onClick={() => onEliminar(activo.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4 px-4">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {activo.marca && <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-tight">{activo.marca}</Badge>}
          {activo.modelo && <Badge variant="outline" className="text-[10px] font-medium">{activo.modelo}</Badge>}
          {activo.tipo && <Badge variant="outline" className="text-[10px] font-medium border-primary/20 text-primary">{activo.tipo}</Badge>}
          {activo.estado && (
            <Badge className={`text-[10px] font-bold ${
              activo.estado === "Bueno" ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20" : 
              activo.estado === "Regular" ? "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20" : 
              "bg-destructive/10 text-destructive hover:bg-destructive/20"
            } border-none`}>
              {activo.estado}
            </Badge>
          )}
        </div>

        <div className="space-y-1.5 bg-muted/30 p-2.5 rounded-xl">
          {activo.tecnico && (
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-primary/60 uppercase">Registrado por</span>
              <span className="text-[11px] font-bold text-foreground/80">{activo.tecnico}</span>
            </div>
          )}
          {activo.numero_serie && (
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-muted-foreground/60 uppercase">S/N</span>
              <span className="text-[11px] font-mono font-bold text-foreground/80">{activo.numero_serie}</span>
            </div>
          )}
          {activo.ubicacion && (
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-medium">
              <MapPin className="h-3.5 w-3.5 text-primary/60 shrink-0" />
              <span className="truncate">{activo.ubicacion}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
