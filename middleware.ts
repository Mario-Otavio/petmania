import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Obtém o token do cookie
  const token = request.cookies.get('token')?.value;

  // Verifica se a rota atual é uma rota protegida (dashboard)
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // Se não houver token, redireciona para o login
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      
      // Opcional: Adicionar a URL original como parâmetro para redirecionar de volta após o login
      // loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
      
      return NextResponse.redirect(loginUrl);
    }
  }

  // Se o usuário tentar acessar o login já estando autenticado, redireciona para o dashboard
  if (request.nextUrl.pathname.startsWith('/login')) {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

// Configura em quais rotas o middleware deve rodar
export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
