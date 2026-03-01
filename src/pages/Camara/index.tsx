import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "@/components/shared/ErrorMessage";
import { Layout } from "@/components/shared/Layout";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { useOCR } from "@/hooks/useOCR";
import type { ActivoCreate } from "@/types";
import { CamaraCaptura } from "./CamaraCaptura";
import { ResultadoOCR } from "./ResultadoOCR";

export const CamaraPage = () => {
  const { resultado, loading, error, escanear, confirmar, limpiar } = useOCR();
  const navigate = useNavigate();

  const handleConfirmar = async (activo: ActivoCreate) => {
    const ok = await confirmar(activo);
    if (ok) {
      navigate("/dashboard");
    }
  };

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <PageHeader
          title="Escanear etiqueta"
          description="Toma una foto de la etiqueta del dispositivo"
        />

        {error && <ErrorMessage message={error} />}

        <Card>
          <CardContent className="pt-6">
            {loading && !resultado && <LoadingSpinner />}

            {!resultado && !loading && <CamaraCaptura onCaptura={escanear} disabled={loading} />}

            {resultado && (
              <ResultadoOCR
                resultado={resultado}
                loading={loading}
                onConfirmar={handleConfirmar}
                onCancelar={limpiar}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};
