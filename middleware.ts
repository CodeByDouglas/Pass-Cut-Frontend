import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const tipo = request.cookies.get('tipo')?.value;
  const pathname = request.nextUrl.pathname;

  const isBarbearia = pathname.startsWith('/barbearia');
  const isCliente = pathname.startsWith('/cliente');

  if ((isBarbearia || isCliente) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isBarbearia && tipo !== 'barbearia') {
    return NextResponse.redirect(new URL('/cliente/agendamentos', request.url));
  }

  if (isCliente && tipo !== 'cliente') {
    return NextResponse.redirect(new URL('/barbearia/agenda', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/barbearia/:path*', '/cliente/:path*']
};