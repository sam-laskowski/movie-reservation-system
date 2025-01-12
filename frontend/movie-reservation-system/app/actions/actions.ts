"use server";
import { cookies } from "next/headers";

export async function register(prevState: any, formData: FormData) {
  console.log(formData);
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

    if (response.ok) {
      const data = await response.json(); // parse JSON body to access the token

      console.log("token recieved", data.token);
      const expiresAt = new Date(Date.now() + 7 * 24 * 3600 * 1000);
      // creatSession()
      (await cookies()).set("session", data.token, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
      });
    }
  } catch (error: any) {
    console.error(error);
  }
}
