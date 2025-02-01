"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { FormState, RegisterFormSchema } from "@/lib/definitions";

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

export async function addMovie(prevState: any, formData: FormData) {
  try {
    // Send POST request to the backend
    const jwtToken = (await cookies()).get("session")?.value;
    //console.log("addmovie cookie", cookie);
    const response = await fetch("http://localhost:8080/movies/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Include authorization token if required
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    if (!response.ok) {
      throw new Error("Failed to add movie");
    }
    // Parse the response
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
