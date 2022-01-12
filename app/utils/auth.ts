import type { ApiError, User } from "@supabase/supabase-js";
import { supabase } from "~/db/supabase.server";
import { createCookie, redirect } from "remix";
import { Nullable } from "~/remix-app";

export const supabaseToken = createCookie("sb:token", {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  maxAge: 604_800,
});

export const getToken = async (request: Request): Promise<string | null> => {
  const cookieHeader = request.headers.get("Cookie");
  return await supabaseToken.parse(cookieHeader);
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

export const getUserByToken = async (
  token: string
): Promise<{ user: Nullable<User>; error: Nullable<ApiError> }> => {
  supabase.auth.setAuth(token);
  const { user, error } = await supabase.auth.api.getUser(token);
  return { user, error };
};

export const getUserByRequestToken = async (request: Request) => {
  const token = await getToken(request);
  if (!token) {
    throw redirect("/login");
  }
  return await getUserByToken(token);
};
