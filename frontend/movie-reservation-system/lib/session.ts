import { jwtVerify } from "jose";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import "server-only";

const secretKey = process.env.JWT_SECRET_KEY;
const encodedKey = new TextEncoder().encode(secretKey);

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (e: any) {
    //console.log(e);
  }
}

export async function verifySession() {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  if (!session?.userId) {
    redirect("/");
  }

  return { userId: session.userId };
}

export async function deleteSession() {
  (await cookies()).delete("session");
  redirect("/");
}
