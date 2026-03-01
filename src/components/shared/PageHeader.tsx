import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useSesionStore } from "@/store/sesionStore";

interface PageHeaderProps {
  title: string;
  description?: string;
}

export const PageHeader = ({ title, description }: PageHeaderProps) => {
  const sesion = useSesionStore((state) => state.sesion);

  const contexto = sesion
    ? [sesion.pabellon, sesion.laboratorio, sesion.armario].filter(Boolean).join(" / ")
    : null;

  return (
    <div className="flex flex-col gap-1 border-b border-border pb-4">
      <h1 className="text-xl font-semibold">{title}</h1>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      {contexto && (
        <Badge variant="secondary" className="mt-1 w-fit gap-1.5">
          <MapPin className="h-3 w-3" />
          {contexto}
        </Badge>
      )}
    </div>
  );
};
