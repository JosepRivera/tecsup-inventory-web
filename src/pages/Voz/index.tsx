import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "@/components/shared/ErrorMessage";
import { Layout } from "@/components/shared/Layout";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { useVoz } from "@/hooks/useVoz";
import type { ActivoCreate } from "@/types";
import { GrabadorVoz } from "./GrabadorVoz";
import { ResultadoVoz } from "./ResultadoVoz";

export const VozPage = () => {
  const {
    resultado,
    grabando,
    loading,
    error,
    iniciarGrabacion,
    detenerGrabacion,
    confirmar,
    limpiar,
  } = useVoz();
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
          title="Dictado de voz"
          description="Habla para registrar un activo o consultar el inventario"
        />

        {error && <ErrorMessage message={error} />}

        <Card>
          <CardContent className="pt-6">
            {loading && !resultado && <LoadingSpinner />}

            {!resultado && !loading && (
              <GrabadorVoz
                grabando={grabando}
                loading={loading}
                onIniciar={iniciarGrabacion}
                onDetener={detenerGrabacion}
              />
            )}

            {resultado && (
              <ResultadoVoz
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
