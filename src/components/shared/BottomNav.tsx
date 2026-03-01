import { Camera, LayoutDashboard, Mic, Search } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useSesionStore } from "@/store/sesionStore";

const links = [
  { to: "/camara", icon: Camera, label: "Escanear" },
  { to: "/voz", icon: Mic, label: "Voz" },
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/busqueda", icon: Search, label: "Búsqueda" },
];

export const BottomNav = () => {
  const sesion = useSesionStore((state) => state.sesion);

  if (!sesion?.activa) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background">
      <div className="mx-auto flex max-w-lg">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex flex-1 flex-col items-center gap-1 py-3 text-xs transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )
            }
          >
            <Icon className="h-5 w-5" />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
