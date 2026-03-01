import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { buscar } from "@/api/busqueda";
import { obtenerTodosLosActivos } from "@/api/activos";
import { ActivoCard } from "@/components/shared/ActivoCard";
import { ErrorMessage } from "@/components/shared/ErrorMessage";
import { Layout } from "@/components/shared/Layout";
import { PageHeader } from "@/components/shared/PageHeader";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { BusquedaFormValues } from "@/schemas/busqueda.schema";
import { busquedaSchema } from "@/schemas/busqueda.schema";
import type { ActivoResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";

export const BusquedaPage = () => {
  const [resultados, setResultados] = useState<ActivoResponse[]>([]);
  const [buscado, setBuscado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const PAGE_SIZE = 20;

  const {
    register,
    watch,
  } = useForm<BusquedaFormValues>({
    resolver: zodResolver(busquedaSchema),
    defaultValues: { q: "" }
  });

  const query = watch("q");

  const cargar = async (p: number, isNewSearch: boolean = false) => {
    try {
      setLoading(true);
      setError(null);
      
      let res: ActivoResponse[];
      if (query) {
        res = await buscar(query, p, PAGE_SIZE);
      } else {
        res = await obtenerTodosLosActivos(p, PAGE_SIZE);
      }

      if (isNewSearch) {
        setResultados(res);
      } else {
        setResultados(prev => [...prev, ...res]);
      }

      setHasMore(res.length === PAGE_SIZE);
      setBuscado(!!query);
    } catch {
      setError("Error al cargar activos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      cargar(1, true);
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    cargar(nextPage);
  };

  return (
    <Layout>
      <div className="flex flex-col gap-4 pb-20">
        <PageHeader
          title="Búsqueda"
          description="Encuentra activos al instante"
        />

        {error && <ErrorMessage message={error} />}

        <div className="relative group mx-1">
          <Input 
            placeholder="Ej: Dell Latitude, ABC123..." 
            {...register("q")} 
            className="pl-10 h-14 text-base transition-all border-border/60 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 rounded-2xl shadow-sm"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
          {loading && page === 1 && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-2 mt-2">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              {buscado ? "Resultados encontrados" : "Inventario Total"}
            </h3>
            <Badge variant="secondary" className="text-[10px] font-bold px-2 py-0.5">
              {resultados.length}
            </Badge>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {resultados.map((activo) => (
              <ActivoCard key={activo.id} activo={activo} />
            ))}
          </div>

          {resultados.length === 0 && !loading && (
            <div className="py-12 text-center">
              <p className="text-sm text-muted-foreground font-medium">No se encontraron activos.</p>
            </div>
          )}

          {hasMore && resultados.length > 0 && (
            <Button 
              variant="outline" 
              onClick={handleLoadMore} 
              disabled={loading}
              className="mt-4 h-14 w-full rounded-2xl border-primary/20 text-primary font-bold hover:bg-primary/5 transition-colors"
            >
              {loading ? "Cargando..." : "Cargar más activos"}
            </Button>
          )}
        </div>
      </div>
    </Layout>
  );
};
