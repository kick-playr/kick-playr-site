import {randomBytes} from 'node:crypto';
import {NextRequest, NextResponse} from 'next/server';

export function proxy(request: NextRequest) {
    const nonce = randomBytes(16).toString('base64');
    const isDev = process.env.NODE_ENV === 'development';
    const policy = [
        "default-src 'self'",
        `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://www.googletagmanager.com${isDev ? " 'unsafe-eval'" : ''}`,
        // Inline styles are used by React/Image; Google Fonts supplies the site font.
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com",
        `connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com${isDev ? ' ws://localhost:* ws://127.0.0.1:*' : ''}`,
        'frame-src https://www.googletagmanager.com',
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
    ].join('; ');
    const requestHeaders = new Headers(request.headers);
    // Overwrite client-supplied values; Next.js reads this policy to nonce its scripts.
    requestHeaders.set('x-nonce', nonce);
    requestHeaders.set('Content-Security-Policy', policy);
    const response = NextResponse.next({request: {headers: requestHeaders}});
    response.headers.set('Content-Security-Policy', policy);
    return response;
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico)$).*)'],
};
