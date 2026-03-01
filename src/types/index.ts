export interface ActivoBase {
  nombre: string | null;
  marca: string | null;
  modelo: string | null;
  tipo: string | null;
  numero_serie: string | null;
  estado: string | null;
  ubicacion: string | null;
  observaciones: string | null;
}

export interface ActivoCreate {
  nombre: string | null;
  marca: string | null;
  modelo: string | null;
  tipo: string | null;
  numero_serie: string | null;
  estado: string | null;
  ubicacion: string | null;
  observaciones: string | null;
  sesion_id: number | null;
  origen: string | null;
}

export interface ActivoResponse {
  id: number;
  nombre: string | null;
  marca: string | null;
  modelo: string | null;
  tipo: string | null;
  numero_serie: string | null;
  estado: string | null;
  ubicacion: string | null;
  observaciones: string | null;
  sesion_id: number | null;
  tecnico: string | null;
  origen: string | null;
  creado_en: string | null;
}

export interface OCRResponse {
  nombre: string | null;
  marca: string | null;
  modelo: string | null;
  tipo: string | null;
  numero_serie: string | null;
  observaciones: string | null;
  confianza: string | null;
  texto_raw: string | null;
}

export interface VozResponse {
  transcripcion: string | null;
  nombre: string | null;
  marca: string | null;
  modelo: string | null;
  tipo: string | null;
  numero_serie: string | null;
  estado: string | null;
  ubicacion: string | null;
  observaciones: string | null;
  es_consulta: boolean;
  respuesta_consulta: string | null;
  query_busqueda: string | null;
  tipo_consulta: string | null;
  resultados: ActivoResponse[] | null;
}

export interface SesionCreate {
  tecnico: string;
  pabellon: string | null;
  laboratorio: string | null;
  armario: string | null;
}

export interface SesionUpdate {
  tecnico?: string | null;
  pabellon: string | null;
  laboratorio: string | null;
  armario: string | null;
}

export interface SesionResponse {
  id: number;
  tecnico: string | null;
  pabellon: string | null;
  laboratorio: string | null;
  armario: string | null;
  activa: number;
  creada_en: string | null;
}

export interface DashboardResumen {
  total: number;
  por_origen: {
    ocr: number;
    voz: number;
    manual: number;
  };
}

export interface GlobalStats {
  total_activos: number;
  total_sesiones: number;
  por_tipo: Record<string, number>;
  por_estado: Record<string, number>;
}
