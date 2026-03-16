import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = new Set([
  '/',
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
]);

const PROTECTED_PREFIXES = ['/dashboard'];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const path = request.nextUrl.pathname;

  // 1️⃣ إذا المستخدم مسجّل دخول وحاول فتح صفحة عامة -> نعيده للداشبورد
  if (PUBLIC_PATHS.has(path) && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 2️⃣ حماية صفحات الـ Dashboard
  if (PROTECTED_PREFIXES.some((p) => path.startsWith(p))) {
    if (!token) {
      const url = new URL('/login', request.url);
      url.searchParams.set('callbackUrl', path);
      return NextResponse.redirect(url);
    }
    // ✅ تحقق من صلاحية الـ JWT يتم على API وليس هنا
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
