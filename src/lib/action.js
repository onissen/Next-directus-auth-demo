"use server";

import { signIn, signOut } from "./auth";
import directus from "@/lib/directus";

export const handleLogout = async () => {
  await signOut();
  await directus.logout();
};

export const login = async (prevState, formData) => {
  const { email, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { email, password });
  } catch (err) {
    console.log(err);
    if (err.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }
    throw err;
  }
};