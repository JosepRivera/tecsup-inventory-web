import { LogOut } from "lucide-react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { cerrarSesion } from "@/api/sesion";
import { cn } from "@/lib/utils";
import { useSesionStore } from "@/store/sesionStore";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { sesion, cerrarSesion: cerrarStore } = useSesionStore();
  const navigate = useNavigate();

  const handleCerrarSesion = async () => {
    try {
      await cerrarSesion();
    } finally {
      cerrarStore();
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {sesion?.activa && (
        <header className="sticky top-0 z-40 border-b border-border bg-background px-4 py-2">
          <div className="mx-auto flex max-w-lg items-center justify-between">
            <span className="text-sm font-medium">Tecsup Inventory</span>
            <button
              type="button"
              onClick={handleCerrarSesion}
              className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-destructive"
            >
              <LogOut className="h-3.5 w-3.5" />
              Cerrar sesión
            </button>
          </div>
        </header>
      )}
      <main className={cn("mx-auto max-w-lg px-4 py-6", sesion?.activa && "pb-24")}>
        {children}
      </main>
    </div>
  );
};
