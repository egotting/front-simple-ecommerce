import {NextRequest, NextResponse} from "next/server";

const publicRoutes = [
    {path: '/sign-in', whenAuthenticated: 'redirect'},
    {path: '/sign-up', whenAuthenticated: 'redirect'},
    {path: '/profile', whenAuthenticated: 'redirect'},
    {path: '/', whenAuthenticated: 'next'},
    // {path: '/dashboard', whenAuthenticated: 'next'}
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED = '/sign-in';

export function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const publicRoute = publicRoutes.find(
        route => route.path === path)
    const getToken = req.cookies.get('token')?.value;


    if (publicRoute === null || publicRoute === undefined) {
        throw new Error("Not found public route");
    }
    if (!getToken && !publicRoute) {
        const redirectUrl = req.nextUrl.clone();
        redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;
        return NextResponse.redirect(redirectUrl);
    }
    if (!getToken && publicRoute) {
        return NextResponse.next();
    }

    if (getToken && publicRoutes && publicRoute?.whenAuthenticated === 'redirect') {

        const redirectUrl = req.nextUrl.clone()
        redirectUrl.pathname = '/';
        return NextResponse.redirect(redirectUrl);
    }


    return NextResponse.next();
}


export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}
