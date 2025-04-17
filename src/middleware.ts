// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { env } from 'process'

export function middleware(request: NextRequest) {
    const allowedPath = '/coming-soon'

    if (env.NODE_ENV !== "development" && !request.nextUrl.pathname.startsWith(allowedPath)) {
        return NextResponse.redirect(new URL(allowedPath, request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!_next|favicon.ico|.*\\..*|api/trpc|api/auth).*)',
    ],
}


