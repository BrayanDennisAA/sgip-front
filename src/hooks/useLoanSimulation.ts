'use client';
import type {
  SimulateLoanRequest,
  SimulateLoanResponse,
} from '@/types/loans/loanTypes';
import { useRef, useState } from 'react';

export function useLoanSimulation() {
  const [result, setResult] = useState<SimulateLoanResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);

  
  async function simulate(payload: SimulateLoanRequest) {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    
    setIsCalculating(true);
    setError(null);

    try {
      const res = await fetch('/api/loans/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error ?? 'No se pudo calcular la simulación.');

      setResult(data as SimulateLoanResponse);
      return data as SimulateLoanResponse;
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return null;
      const message = err instanceof Error ? err.message : 'Error desconocido.';
      setError(message);
      setResult(null);
      return null;
    } finally {
      if (controllerRef.current === controller) setIsCalculating(false);
    }
  }

  return { simulate, result, error, isCalculating };
}
