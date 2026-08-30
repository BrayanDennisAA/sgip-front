import { BackendError } from '@/lib/httpRequest';
import { simulateLoan } from '@/services/loansService';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  try {
    console.log('Simulating loan with payload:', body);
    const result = await simulateLoan(body);
    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof BackendError
        ? error.message
        : 'Error al simular el préstamo.';
    const status = error instanceof BackendError ? error.status : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
