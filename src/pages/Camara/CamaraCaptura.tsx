import { Camera, RotateCcw } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface CamaraCapturaProps {
  onCaptura: (imagen: File) => void;
  disabled?: boolean;
}

export const CamaraCaptura = ({ onCaptura, disabled }: CamaraCapturaProps) => {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
    onCaptura(file);
  };

  const reiniciar = () => {
    setPreview(null);
    if (cameraInputRef.current) cameraInputRef.current.value = "";
    if (galleryInputRef.current) galleryInputRef.current.value = "";
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Input para Cámara Directa */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleChange}
      />
      
      {/* Input para Galería/Archivos */}
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />

      {preview ? (
        <div className="space-y-4">
          <div className="relative group">
            <img
              src={preview}
              alt="Previsualización"
              className="w-full rounded-2xl border-4 border-white shadow-xl object-cover max-h-[400px]"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
          </div>
          <Button variant="outline" onClick={reiniciar} disabled={disabled} className="w-full h-12 rounded-xl font-bold bg-white shadow-sm">
            <RotateCcw className="mr-2 h-4 w-4" />
            Tomar otra foto
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          <button
            type="button"
            className="flex flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed border-primary/20 p-12 bg-primary/5 hover:bg-primary/10 hover:border-primary/40 transition-all group"
            onClick={() => cameraInputRef.current?.click()}
            disabled={disabled}
          >
            <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
              <Camera className="h-10 w-10 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-foreground/80">Abrir Cámara</p>
              <p className="text-xs text-muted-foreground mt-1">Usa la cámara trasera</p>
            </div>
          </button>

          <Button 
            variant="secondary" 
            className="h-14 rounded-2xl font-bold text-base bg-white border border-border/60 shadow-sm"
            onClick={() => galleryInputRef.current?.click()}
            disabled={disabled}
          >
            <div className="mr-2 p-1.5 bg-secondary rounded-lg">
              <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            Subir desde Galería
          </Button>
        </div>
      )}
    </div>
  );
};
