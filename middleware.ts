import { NextResponse, type NextRequest } from 'next/server';

import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { i18n } from 'src/i18n/i18n-config';

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;

  // Use negotiator and intl-localematcher to get best locale

  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

const middleware = (req: NextRequest) => {
  const url = req.nextUrl.clone();
  const { pathname } = url;

  const locale = getLocale(req);

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    console.log(
      'pathnameIsMissingLocale',
      // locale,
      pathname,
      `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`
    );

    return NextResponse.rewrite(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        url
      )
    );
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/:path((?!_next/static|favicon.ico|_next/image|icons).*)'],
};

export default middleware;
