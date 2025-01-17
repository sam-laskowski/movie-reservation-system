import { verifySession } from "@/lib/session";
import { cache } from "react";

export const getUser = cache(async () => {
  // 1. Verify users session
  const session = await verifySession();

  // 2. Fetch user data
  const userId = session.userId;
  return userId;
});
