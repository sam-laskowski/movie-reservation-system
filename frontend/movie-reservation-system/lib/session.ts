"use server";

import "server-only";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const secretKey = process.env.JWT_SECRET_KEY;
const encodedKey = new TextEncoder().encode(secretKey);

export async function decrypt(session: string | undefined = "") {
  try {
    if (!session) return null;

    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (e: any) {
    console.log(e);
    return null;
  }
}

export async function verifySession() {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  if (!session?.userId) {
    return null;
  }

  return { userId: session.userId, role: session?.role };
}

export async function deleteSession() {
  (await cookies()).delete("session");
  redirect("/");
}
