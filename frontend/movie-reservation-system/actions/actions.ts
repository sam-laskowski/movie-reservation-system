"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { deleteSession } from "@/lib/session";

//TODO: use zod for form validation

export async function register(prevState: any, formData: FormData) {
  console.log(formData);
  let loginSuccessful = false;
  try {
    const response = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to register: CUSTOM");
    }
    // console.log(response); // raw response object

    const data = await response.json(); // parse JSON body to access the token

    console.log("token recieved", data.token);
    const expiresAt = new Date(Date.now() + 7 * 24 * 3600 * 1000);
    // creatSession()
    (await cookies()).set("session", data.token, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
    });
    loginSuccessful = true;
  } catch (error: any) {
    console.error(error);
  }
  if (loginSuccessful) redirect("/");
}

export async function login(prevState: any, formData: FormData) {
  let loginSuccessful = false;
  try {
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to login: CUSTOM");
    }
    // console.log(response); // raw response object

    const data = await response.json(); // parse JSON body to access the token

    console.log("token recieved", data.token);
    const expiresAt = new Date(Date.now() + 7 * 24 * 3600 * 1000);
    // creatSession()
    (await cookies()).set("session", data.token, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
    });
    loginSuccessful = true;
  } catch (error: any) {
    console.error(error);
  }
  if (loginSuccessful) redirect("/");
}

export async function logout() {
  let logoutSuccessful = false;
  try {
    // clear session cookie
    (await cookies()).set("session", "", {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
    });
    logoutSuccessful = true;
  } catch (e: any) {
    console.error("Failed to logout", e);
  }
  if (logoutSuccessful) redirect("/");
}
