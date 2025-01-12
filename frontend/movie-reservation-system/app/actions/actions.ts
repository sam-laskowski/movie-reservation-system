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
  } catch (error: any) {
    console.error(error);
  }
}
