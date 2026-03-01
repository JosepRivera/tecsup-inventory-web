import { useRef, useState } from "react";
import { confirmarVoz, dictar } from "@/api/voz";
import type { ActivoCreate, VozResponse } from "@/types";

export const useVoz = () => {
  const [resultado, setResultado] = useState<VozResponse | null>(null);
  const [grabando, setGrabando] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  const iniciarGrabacion = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      chunks.current = [];

      mediaRecorder.current.ondataavailable = (e) => {
        chunks.current.push(e.data);
      };

      mediaRecorder.current.onstop = async () => {
        const audio = new Blob(chunks.current, { type: "audio/webm" });
        await enviarAudio(audio);
        for (const track of stream.getTracks()) {
          track.stop();
        }
      };

      mediaRecorder.current.start();
      setGrabando(true);
    } catch {
      setError("No se pudo acceder al micrófono");
    }
  };

  const detenerGrabacion = () => {
    if (mediaRecorder.current && grabando) {
      mediaRecorder.current.stop();
      setGrabando(false);
    }
  };

  const enviarAudio = async (audio: Blob) => {
    try {
      setLoading(true);
      setError(null);
      const res = await dictar(audio);
      setResultado(res);
    } catch {
      setError("No se pudo procesar el audio");
    } finally {
      setLoading(false);
    }
  };

  const confirmar = async (activo: ActivoCreate): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await confirmarVoz(activo);
      setResultado(null);
      return true;
    } catch {
      setError("No se pudo guardar el activo");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const limpiar = () => {
    setResultado(null);
    setError(null);
  };

  return {
    resultado,
    grabando,
    loading,
    error,
    iniciarGrabacion,
    detenerGrabacion,
    confirmar,
    limpiar,
  };
};
