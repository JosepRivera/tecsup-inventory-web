import { BarChart3, FileSpreadsheet, FileText, History, Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { actualizarActivo } from "@/api/activos";
import { eliminarActivo, obtenerActivos, obtenerResumen } from "@/api/dashboard";
import { exportarExcel, exportarExcelGlobal, exportarPDF, exportarPDFGlobal } from "@/api/exportar";
import { ActivoCard } from "@/components/shared/ActivoCard";
import { ErrorMessage } from "@/components/shared/ErrorMessage";
import { Layout } from "@/components/shared/Layout";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { PageHeader } from "@/components/shared/PageHeader";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { ActivoResponse, DashboardResumen } from "@/types";
import { EditActivoDialog } from "./EditActivoDialog";

export const DashboardPage = () => {
  const [activos, setActivos] = useState<ActivoResponse[]>([]);
  const [resumen, setResumen] = useState<DashboardResumen | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editActivo, setEditActivo] = useState<ActivoResponse | null>(null);
  const [updating, setUpdating] = useState(false);

  const cargar = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [activosRes, resumenRes] = await Promise.all([obtenerActivos(), obtenerResumen()]);
      setActivos(activosRes);
      setResumen(resumenRes);
    } catch {
      setError("No se pudieron cargar los activos");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleEliminarClick = (id: number) => {
    setDeleteId(id);
  };

  const confirmarEliminar = async () => {
    if (deleteId === null) return;
    try {
      await eliminarActivo(deleteId);
      setActivos((prev) => prev.filter((a) => a.id !== deleteId));
    } catch {
      setError("No se pudo eliminar el activo");
    } finally {
      setDeleteId(null);
    }
  };

  const confirmarEditar = async (id: number, data: Partial<ActivoResponse>) => {
    try {
      setUpdating(true);
      const actualizada = await actualizarActivo(id, data);
      setActivos((prev) => prev.map((a) => (a.id === id ? actualizada : a)));
      setEditActivo(null);
    } catch {
      setError("No se pudo actualizar el activo");
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    cargar();
  }, [cargar]);

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <PageHeader title="Dashboard" description="Activos registrados en esta jornada" />

        {error && <ErrorMessage message={error} />}

        {resumen && (
          <div className="grid grid-cols-3 gap-2.5">
            <Card className="bg-primary/5 border-primary/10">
              <CardContent className="flex flex-col items-center py-4 px-1 text-center">
                <p className="text-2xl font-black text-primary leading-none">{resumen.total}</p>
                <p className="text-[10px] font-bold text-primary/60 uppercase tracking-wider mt-1.5">Total</p>
              </CardContent>
            </Card>
            <Card className="bg-secondary/20 border-border/40">
              <CardContent className="flex flex-col items-center py-4 px-1 text-center">
                <p className="text-2xl font-black text-foreground leading-none">{resumen.por_origen.ocr}</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-1.5">OCR</p>
              </CardContent>
            </Card>
            <Card className="bg-secondary/20 border-border/40">
              <CardContent className="flex flex-col items-center py-4 px-1 text-center">
                <p className="text-2xl font-black text-foreground leading-none">{resumen.por_origen.voz}</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-1.5">Voz</p>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Button variant="default" className="h-14 text-base" asChild>
            <Link to="/historial">
              <History className="mr-2 h-5 w-5" />
              Historial
            </Link>
          </Button>
          <Button variant="default" className="h-14 text-base" asChild>
            <Link to="/estadisticas">
              <BarChart3 className="mr-2 h-5 w-5" />
              Estadísticas
            </Link>
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">
            Exportar Sesión Actual
          </p>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-14 text-base" onClick={exportarPDF}>
              <FileText className="mr-2 h-5 w-5" />
              PDF
            </Button>
            <Button variant="outline" className="h-14 text-base" onClick={exportarExcel}>
              <FileSpreadsheet className="mr-2 h-5 w-5" />
              Excel
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[10px] font-bold text-primary uppercase tracking-widest px-1">
            Exportación de Inventario Total
          </p>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="secondary" 
              className="h-14 text-base font-bold bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20" 
              onClick={exportarPDFGlobal}
            >
              <FileText className="mr-2 h-5 w-5" />
              PDF Global
            </Button>
            <Button 
              variant="secondary" 
              className="h-14 text-base font-bold bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20" 
              onClick={exportarExcelGlobal}
            >
              <FileSpreadsheet className="mr-2 h-5 w-5" />
              Excel Global
            </Button>
          </div>
        </div>

        {loading && <LoadingSpinner />}

        {!loading && activos.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <Plus className="h-10 w-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No hay activos registrados aún.</p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {activos.map((activo) => (
            <ActivoCard
              key={activo.id}
              activo={activo}
              onEliminar={handleEliminarClick}
              onEdit={setEditActivo}
            />
          ))}
        </div>

        <EditActivoDialog
          activo={editActivo}
          open={editActivo !== null}
          onClose={() => setEditActivo(null)}
          onConfirm={confirmarEditar}
          loading={updating}
        />

        <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Eliminar activo?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. Se eliminará permanentemente este activo del
                inventario.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={confirmarEliminar}
              >
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Layout>
  );
};
