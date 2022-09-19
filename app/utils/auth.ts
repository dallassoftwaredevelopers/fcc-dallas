import type { ApiError, User } from '@supabase/supabase-js';
import { createCookie, redirect } from 'remix';
import { SUPABASE_COOKIE_NAME } from '~/constants/supabase-constants';
import { supabase } from '~/db/supabase.server';
import { Nullable } from '~/remix-app';

export type Role = 'ADMIN' | 'USER';
interface UserDetails {
  email: string;
  role: Role;
}
export const supabaseToken = createCookie(SUPABASE_COOKIE_NAME, {
  httpOnly: true,
  secure: false,
  sameSite: 'lax',
  maxAge: 604_800,
});

export const getUserByToken = async (
  token: string
): Promise<{ user: Nullable<User>; error: Nullable<ApiError> }> => {
  supabase.auth.setAuth(token);
  const { user, error } = await supabase.auth.api.getUser(token);
  return { user, error };
};

export const getToken = async (request: Request): Promise<string | null> => {
  const cookieHeader = request.headers.get('Cookie');
  const sbCookie: { token: string; user: UserDetails } = await supabaseToken.parse(cookieHeader);
  if (sbCookie?.token) {
    return sbCookie.token;
  }
  console.warn('Unable to retrieve token');
  return null;
};

export const isAuthenticated = async (
  validateAndReturnUser: boolean = false
): Promise<{ user: Nullable<User> } | boolean> => {
  const session = supabase.auth.session();
  if (!session || (session.expires_at ?? 0) < Math.floor(Date.now() / 1000)) {
    return false;
  }
  if (validateAndReturnUser) {
    const { user, error } = await getUserByToken(session.access_token);
    if (error) {
      return false;
    }
    return { user };
  }
  return true;
};

export const getUserByRequestToken = async (request: Request) => {
  const token = await getToken(request);
  if (!token) {
    throw redirect('/login');
  }
  return getUserByToken(token);
};

export const getRole = async (request: Request): Promise<Nullable<string>> => {
  const cookieHeader = request.headers.get('Cookie');
  const sbCookie: { token: string; user: UserDetails } = await supabaseToken.parse(cookieHeader);
  if (!sbCookie) {
    return null;
  }
  return sbCookie.user.role;
};

export const isAdmin = async (request: Request): Promise<boolean> =>
  (await getRole(request)) === 'ADMIN';
