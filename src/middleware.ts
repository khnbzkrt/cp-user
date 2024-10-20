import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
   const authRoutes = ['/login', '/register']

   const accessToken = request.cookies.get('access_token')

   if (!authRoutes.includes(request.nextUrl.pathname) && !accessToken?.value) {
      return NextResponse.redirect(new URL('/login', request.url))
   }

   if (authRoutes.includes(request.nextUrl.pathname) && accessToken?.value) {
      return NextResponse.redirect(new URL('/', request.url))
   }

   NextResponse.next()
}

export const config = {
   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
