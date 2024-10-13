import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
    const authRoutes = ["/login","/register"];

    let accessToken = request.cookies.get('access_token')

    if(!authRoutes.includes(request.nextUrl.pathname) && !accessToken?.value){
        return NextResponse.redirect(new URL('/login', request.url))
    }
  }