import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { TOKEN } from './lib/storage-keys'

export function middleware(request: NextRequest) {
  const token = request.cookies.get(TOKEN)?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = { matcher: ['/view/:path*'] }
