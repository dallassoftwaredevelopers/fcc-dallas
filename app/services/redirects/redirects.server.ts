import { pipe, pipeWith } from 'pipe-ts';
import { redirect } from 'remix';
import { REDIRECTS_MAP } from '~/constants/redirects';

const LOCAL_HOST = '127.0.0.1';
const HTTP_PREFIX = 'http://';
const HTTPS_PREFIX = 'https://';
const HTTPS_WWW_PREFIX = 'https://www.';

const httpToHTtps = (url: string) =>
  url.includes(LOCAL_HOST) ? url : url.replace(HTTP_PREFIX, HTTPS_PREFIX);

const stripWww = (url: string) => url.replace(HTTPS_WWW_PREFIX, HTTPS_PREFIX);

const normalizeUrl = pipe(httpToHTtps, stripWww);

const httpsRedirectIfNeeded = (url: string) => {
  const redirectUrl = normalizeUrl(url);

  if (redirectUrl === url) {
    return null;
  }

  return redirect(redirectUrl, {
    status: 301,
  });
};

// to avoid two redirect, create a format function for www and https -- so split up httpsRedirect
export const makeRedirectIfExists = (url: string) => {
  const redirectTo = REDIRECTS_MAP[url];
  if (!redirectTo) {
    return httpsRedirectIfNeeded(url);
  }
  return pipeWith(redirectTo, normalizeUrl, (r) =>
    redirect(r, {
      status: 301,
    })
  );
};
