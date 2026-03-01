import { BarChart3, History, Package, PieChart } from "lucide-react";
import { useEffect, useState } from "react";
import { obtenerEstadisticasGlobales } from "@/api/dashboard";
import { ErrorMessage } from "@/components/shared/ErrorMessage";
import { Layout } from "@/components/shared/Layout";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GlobalStats } from "@/types";

export const EstadisticasPage = () => {
  const [stats, setStats] = useState<GlobalStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        setLoading(true);
        const data = await obtenerEstadisticasGlobales();
        setStats(data);
      } catch {
        setError("Error al cargar las estadísticas globales");
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  if (loading)
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Estadísticas"
          description="Métricas globales del patrimonio tecnológico"
        />

        {error && <ErrorMessage message={error} />}

        {stats && (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-none bg-primary text-primary-foreground shadow-lg">
                <CardContent className="flex flex-col items-center py-6">
                  <div className="p-2 bg-white/20 rounded-full mb-2">
                    <Package className="h-6 w-6" />
                  </div>
                  <p className="text-3xl font-extrabold">{stats.total_activos}</p>
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] opacity-80">
                    Total Activos
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none bg-white shadow-md">
                <CardContent className="flex flex-col items-center py-6 text-foreground">
                  <div className="p-2 bg-primary/10 rounded-full mb-2">
                    <History className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-3xl font-extrabold">{stats.total_sesiones}</p>
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    Total Sesiones
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-sm border-border/40">
              <CardHeader className="pb-4">
                <CardTitle className="text-base flex items-center gap-2 font-bold">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Distribución por Tipo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {Object.entries(stats.por_tipo).map(([tipo, cantidad]) => {
                    const percentage = Math.round((cantidad / stats.total_activos) * 100);
                    return (
                      <div key={tipo} className="space-y-1.5">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-semibold capitalize text-foreground/80">
                            {tipo}
                          </span>
                          <span className="text-xs font-bold text-primary">
                            {cantidad} ({percentage}%)
                          </span>
                        </div>
                        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-500 ease-out"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                  {Object.keys(stats.por_tipo).length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      No hay datos por tipo aún.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-border/40">
              <CardHeader className="pb-4">
                <CardTitle className="text-base flex items-center gap-2 font-bold">
                  <PieChart className="h-5 w-5 text-primary" />
                  Estado de Conservación
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {Object.entries(stats.por_estado).map(([estado, cantidad]) => (
                    <div
                      key={estado}
                      className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 border border-border/20"
                    >
                      <span className="text-sm font-medium capitalize">{estado}</span>
                      <Badge variant="default" className="bg-primary hover:bg-primary font-bold">
                        {cantidad}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};
