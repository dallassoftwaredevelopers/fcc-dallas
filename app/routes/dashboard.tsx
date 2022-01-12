import * as React from "react";
import { LoaderFunction, Outlet, redirect } from "remix";
import { isAuthenticated } from "~/utils/auth";

export const loader: LoaderFunction = async () => {
  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) {
    return redirect("/login");
  }
  return null;
};

const Profile = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Profile;
