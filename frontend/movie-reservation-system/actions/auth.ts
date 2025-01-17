"use server";

import { cookies } from "next/headers";

export async function auth() {
  const sessionCookie = (await cookies()).get("session");
  console.log(sessionCookie);
  if (sessionCookie != undefined) return true;
  else return false;
}
