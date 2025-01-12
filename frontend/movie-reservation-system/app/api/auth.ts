import { NextRequest, NextResponse } from "next/server";

export default async function handler(req: NextRequest, res: NextResponse) {
  const { username, password } = req.body;

  const response = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    const token = await response.text();
    res.setHeader("Set-Cookie", `jwt=${token}; HttpOnly; Path=/`);
    res.status(200).json({ success: true });
  } else {
    res.status(response.status).json({ error: "Invalid credentials" });
  }
}
