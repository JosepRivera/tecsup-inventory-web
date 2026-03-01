import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "@/components/shared/ErrorMessage";
import { Layout } from "@/components/shared/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSesion } from "@/hooks/useSesion";
import { SesionForm } from "./SesionForm";

export const SesionPage = () => {
  const { sesion, error, cargarContexto } = useSesion();
  const navigate = useNavigate();

  useEffect(() => {
    cargarContexto();
  }, [cargarContexto]);

  useEffect(() => {
    if (sesion?.activa) {
      navigate("/camara");
    }
  }, [sesion, navigate]);

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Tecsup Inventory</h1>
          <p className="text-sm text-muted-foreground">
            Configura tu sesión para comenzar el inventariado
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Nueva jornada</CardTitle>
            <CardDescription>
              Indica dónde vas a trabajar hoy. Estos datos se aplicarán automáticamente a todos los
              activos que registres.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && <ErrorMessage message={error} />}
            <SesionForm />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};
