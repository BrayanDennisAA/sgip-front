import { ActionResult } from '@/types/httpTypes';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

export function useServerAction<Args extends unknown[], T>(
  action: (...args: Args) => Promise<ActionResult<T>>,
  options?: { refreshOnSuccess?: boolean; onSuccess?: (data?: T) => void },
) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  function run(...args: Args) {
    setError(null);
    startTransition(async () => {
      const result = await action(...args);
      if (!result.success) {
        setError(result.error ?? 'Ocurrió un error.');
        return;
      }
      options?.onSuccess?.(result.data);
      if (options?.refreshOnSuccess ?? true) router.refresh();
    });
  }

  return { run, isPending, error, clearError: () => setError(null) };
}
