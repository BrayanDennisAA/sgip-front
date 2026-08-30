import 'server-only';

const API_URL = process.env.API_URL ?? 'http://localhost:5100';

export class BackendError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = 'BackendError';
  }
}

export async function httpRequest<T>(
  url: string,
  options?: RequestInit & { revalidate?: number | false },
): Promise<T> {
  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
    cache: options?.revalidate === false ? 'no-store' : 'default',
  });

  if (!response.ok) {
    let message = `Error del backend (${response.status})`;
    try {
      const body = await response.json();
      console.log('Detalle error', body);
      message = body.detail ?? message;
    } catch {
      // responsepuesta sin body JSON, se usa el mensaje genérico
    }
    throw new BackendError(message, response.status);
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}
