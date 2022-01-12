import * as React from "react";
import { supabaseClient } from "~/db/supabase-client";

const Overview = () => {
  // todo fix sign out
  const logout = async (e: React.MouseEvent) => {
    await supabaseClient?.auth?.signOut();
    await fetch("/api/logout", {
      method: "POST",
    });
  };
  return (
    <div>
      <strong>Logged in! build out stuff, but start with dashboard.tsx</strong>
      <button type="button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Overview;
