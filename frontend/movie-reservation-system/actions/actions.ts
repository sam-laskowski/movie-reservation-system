"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { FormState, RegisterFormSchema } from "@/lib/definitions";
import { movieSchema, showSchema } from "@/lib/movieSchema";

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
  const raw = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    posterImage: formData.get("posterImage") as string,
    backdropImage: formData.get("backdropImage") as string,
    genre: formData.get("genre") as string,
    duration: formData.get("duration") as string,
    ageRating: formData.get("ageRating") as string,
  };
  const parsed = movieSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      data: raw,
      message: "Failed to add movie.",
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
    return { general: "Server error: Could not add movie", data: raw };
  }
}

export async function createShowing(_prevState: any, formData: FormData) {
  const raw = {
    movieId: formData.get("movieId"),
    cinemaRoomId: formData.get("cinemaRoomId"),
    endTime: `${formData.get("endDate") as string}T${
      formData.get("endTime") as string
    }`,
    startTime: `${formData.get("startDate") as string}T${
      formData.get("startTime") as string
    }`,
  };
  console.log(raw);

  const parsed = showSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      data: raw,
      message: "Failed to add movie.",
    };
  }

  try {
    const jwtToken = (await cookies()).get("session")?.value;
    const response = await fetch("http://backend:8080/shows/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(parsed.data),
    });
    if (!response.ok) throw new Error("Failed to create show");
    return null;
  } catch (error) {
    return { general: "Server error: Could not create show", data: raw };
  }
}

export const bookSeat = async (userId: any, showId: string, seatId: number) => {
  console.log("pressed");
  if (!userId) return;
  const bookingRequestData = {
    userId: userId,
    showId: showId,
    seatId: seatId,
  };
  console.log(bookingRequestData);
  try {
    const response = await fetch("http://backend:8080/bookings/book-seat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingRequestData),
    });
    console;
    if (!response.ok) throw new Error("Failed to Book");
    return null;
  } catch (e) {
    console.log("Booking error", e);
  }
};
