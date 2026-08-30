'use client';
import type {
  SimulateLoanRequest,
  SimulateLoanResponse,
} from '@/types/loans/loanTypes';
import { useState } from 'react';

export function useLoanSimulation() {
  const [result, setResult] = useState<SimulateLoanResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const loanTypesMap: Map<string, number> = new Map([
    ['Fixed', 0],
    ['Decreasing', 1],
  ]);

  async function simulate(payload: SimulateLoanRequest) {
    setIsCalculating(true);
    setError(null);

    const payloadParsed = {
      amount: Number(payload.amount),
      term: Number(payload.term),
      loanType: loanTypesMap.get(payload.loanType) ?? 0,
    };

    try {
      const res = await fetch('/api/loans/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payloadParsed),
      });

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error ?? 'No se pudo calcular la simulación.');

      setResult(data as SimulateLoanResponse);
      return data as SimulateLoanResponse;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido.';
      setError(message);
      setResult(null);
      return null;
    } finally {
      setIsCalculating(false);
    }
  }

  return { simulate, result, error, isCalculating };
}
