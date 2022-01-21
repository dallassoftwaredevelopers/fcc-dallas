import { redirect } from 'remix';
import { REDIRECTS_MAP } from '~/constants/redirects';

const httpsRedirect = (url: string) => {
  if (url.includes('www')) {
    let redirectUrl = url.replace('www.', '');

    if (!redirectUrl.includes('https') && redirectUrl.includes('http')) {
      redirectUrl = redirectUrl.replace('http', 'https');
    }
    return redirect(redirectUrl, {
      status: 301,
    });
  }
  return null;
};

export const makeRedirectIfExists = (url: string) => {
  const httpsRedirectResponse = httpsRedirect(url);
  if (httpsRedirectResponse) {
    return httpsRedirectResponse;
  }

  const redirectTo = REDIRECTS_MAP[url];
  if (!redirectTo) {
    return null;
  }
  return redirect(redirectTo, {
    status: 301,
  });
};
