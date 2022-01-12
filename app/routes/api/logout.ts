import { ActionFunction, redirect } from "remix";
import { supabase } from "~/db/supabase.server";
import { getToken, supabaseToken } from "~/utils/auth";

export const action: ActionFunction = async ({ request }) => {
  const token = await getToken(request);
  const { error } = await supabase.auth.api.signOut(token!);
  console.log("logging out...");

  // if error, log and move on to get rid of token
  if (error) {
    console.error(`Logout Exception: ${error.status} ${error.message}`);
  }

  return redirect("/login", {
    headers: {
      "Set-Cookie": await supabaseToken.serialize("", { maxAge: 0 }),
    },
  });
};
