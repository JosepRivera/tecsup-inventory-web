import { Calendar, Hospital, Layers } from "lucide-react";
import { useEffect, useState } from "react";
import { obtenerSesiones } from "@/api/sesion";
import { ErrorMessage } from "@/components/shared/ErrorMessage";
import { Layout } from "@/components/shared/Layout";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { SesionResponse } from "@/types";

export const HistorialPage = () => {
  const [sesiones, setSesiones] = useState<SesionResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        setLoading(true);
        const data = await obtenerSesiones();
        setSesiones(data);
      } catch {
        setError("Error al cargar el historial de sesiones");
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Historial de Sesiones"
          description="Registro cronológico de jornadas de inventariado"
        />

        {error && <ErrorMessage message={error} />}
        {loading && <LoadingSpinner />}

        <div className="flex flex-col gap-4">
          {sesiones.map((sesion) => (
            <Card
              key={sesion.id}
              className="overflow-hidden border-border/40 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-1.5 w-full bg-primary/20">
                {sesion.activa === 1 && <div className="h-full bg-primary w-full" />}
              </div>
              <CardHeader className="pb-3 pt-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-primary">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm font-bold">
                        {sesion.creada_en
                          ? new Intl.DateTimeFormat("es-PE", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            }).format(new Date(sesion.creada_en))
                          : "Fecha desconocida"}
                      </span>
                    </div>
                  </div>
                  {sesion.activa === 1 ? (
                    <Badge className="bg-primary text-primary-foreground animate-pulse">
                      En curso
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-muted-foreground">
                      Finalizada
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pb-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                      Ubicación
                    </p>
                    <div className="flex items-center gap-2 text-xs font-semibold text-foreground/80">
                      <Hospital className="h-3.5 w-3.5 text-primary/60" />
                      <span>{sesion.pabellon || "-"}</span>
                      <span className="text-muted-foreground/40 px-1">|</span>
                      <Layers className="h-3.5 w-3.5 text-primary/60" />
                      <span>{sesion.laboratorio || "-"}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                      Detalle
                    </p>
                    <p className="text-xs font-semibold text-foreground/80">
                      Armario: <span className="text-primary">{sesion.armario || "N/A"}</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {!loading && sesiones.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 bg-secondary/20 rounded-3xl border-2 border-dashed border-border/40">
              <Calendar className="h-12 w-12 text-muted-foreground/30 mb-3" />
              <p className="text-sm font-medium text-muted-foreground">
                No se registran sesiones previas.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
