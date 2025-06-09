"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { FormState, RegisterFormSchema } from "@/lib/definitions";
import { movieSchema } from "@/lib/movieSchema";

export async function register(state: FormState, formData: FormData) {
  console.log(formData);

  const validateFields = RegisterFormSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // if any form fields invalid return early
  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  let loginSuccessful = false;
  try {
    const response = await fetch("http://backend:8080/auth/register", {
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
    const response = await fetch("http://backend:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
    if (!response.ok) {
      console.log(response);
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
  if (loginSuccessful) redirect("/"); // TODO: redirect to page they were just on
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
}

export async function addMovie(_prevState: any, formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = movieSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const jwtToken = (await cookies()).get("session")?.value;
    const response = await fetch("http://backend:8080/movies/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(parsed.data),
    });

    if (!response.ok) throw new Error("Failed to add movie");
    return null;
  } catch (error) {
    return { general: "Server error: Could not add movie" };
  }
}
