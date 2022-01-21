import { redirect } from 'remix';
import { SITE_BASE_URL } from '~/constants/global';

interface RedirectUrl {
  from: string;
  to: string;
}

const REDIRECTS: RedirectUrl[] = [
  {
    from: `${SITE_BASE_URL}/about-us`,
    to: SITE_BASE_URL,
  },
];

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

  const redirectDetails = REDIRECTS.find((r) => r.from === url);
  if (!redirectDetails) {
    return null;
  }
  return redirect(redirectDetails.to, {
    status: 301,
  });
};
