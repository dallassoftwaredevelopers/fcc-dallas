import { SITE_BASE_URL } from './global';

type From = string;
type To = string;
export const REDIRECTS_MAP: Readonly<Record<From, To>> = {
  [`${SITE_BASE_URL}/about-us`]: SITE_BASE_URL,
};
