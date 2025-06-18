import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token');

  // Если нет токена, редирект на страницу логина
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Определи пути, к которым применяется middleware
export const config = {
  matcher: ['/dashboard/:path*','/customers/:path*','/:path*'], // например, защищаем весь дашборд
};
