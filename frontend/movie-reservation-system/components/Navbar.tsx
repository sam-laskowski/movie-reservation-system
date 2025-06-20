import { logout } from "@/actions/actions";
import { verifySession } from "@/lib/session";
import Link from "next/link";

export default async function Navbar() {
  const session = await verifySession();
  const user = session?.userId;
  const sessionRole = session?.role;
  // no user logged in
  if (!user) {
    return (
      <div>
        <div className="flex flex-row justify-center items-center gap-3">
          <Link href={"/"}>
            <h1 className="text-4xl p-3">Cinema Deluxe</h1>
          </Link>

          <Link href="/movies">Explore Movies</Link>
          <Link href="/register">Register</Link>
          <Link href="/login">Login</Link>
        </div>
      </div>
    );
  }

  // user logged in
  return (
    <div>
      <div className="flex flex-row justify-center items-center gap-3">
        {sessionRole == "ADMIN" && (
          <Link href={"/dashboard"}>ADMIN Dashboard</Link>
        )}
        <Link href={"/"}>
          <h1 className="text-4xl p-3">Cinema Deluxe</h1>
        </Link>
        <Link href="/movies">Explore Movies</Link>
        <Link href={`/profile/${user}`}>Profile</Link>

        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
