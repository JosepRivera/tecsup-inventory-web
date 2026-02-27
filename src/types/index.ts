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
  pabellon: string | null;
  laboratorio: string | null;
  armario: string | null;
}

export interface SesionUpdate {
  pabellon: string | null;
  laboratorio: string | null;
  armario: string | null;
}

export interface SesionResponse {
  id: number;
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
