import { Mic, MicOff, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GrabadorVozProps {
  grabando: boolean;
  loading: boolean;
  disabled?: boolean;
  onIniciar: () => void;
  onDetener: () => void;
}

export const GrabadorVoz = ({
  grabando,
  loading,
  disabled,
  onIniciar,
  onDetener,
}: GrabadorVozProps) => {
  return (
    <div className="flex flex-col items-center gap-6 py-6">
      <div
        className={cn(
          "flex h-24 w-24 items-center justify-center rounded-full border-4 transition-all duration-300",
          grabando ? "animate-pulse border-destructive bg-destructive/10" : "border-muted bg-muted",
        )}
      >
        {grabando ? (
          <Mic className="h-10 w-10 text-destructive" />
        ) : (
          <MicOff className="h-10 w-10 text-muted-foreground" />
        )}
      </div>

      <p className="text-sm text-muted-foreground">
        {loading
          ? "Procesando audio..."
          : grabando
            ? "Grabando... pulsa para detener"
            : "Pulsa el botón para grabar"}
      </p>

      {!grabando ? (
        <Button onClick={onIniciar} disabled={disabled || loading} size="lg" className="w-full">
          <Mic className="mr-2 h-5 w-5" />
          Iniciar grabación
        </Button>
      ) : (
        <Button onClick={onDetener} variant="destructive" size="lg" className="w-full">
          <Square className="mr-2 h-5 w-5" />
          Detener grabación
        </Button>
      )}
    </div>
  );
};
