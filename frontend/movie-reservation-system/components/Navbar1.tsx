import { verifySession } from "@/lib/session";
import Link from "next/link";
import { MobileNavLinks } from "./NavbarMobile";

export default async function Navbar1() {
  const session = await verifySession();
  const user = session?.userId;
  const sessionRole = session?.role;

  return (
    <nav className="bg-[#09090B] text-white p-4 shadow-xl sticky top-0 z-50 border-b-2 border-orange-500">
      <div className="container mx-auto flex justify-between items-center relative">
        <Link
          href={"/"}
          className="flex items-center group"
        >
          <h1 className="uppercase text-4xl sm:text-5xl font-extrabold transition-colors duration-300 group-hover:text-orange-400">
            Cinema
          </h1>
        </Link>

        <MobileNavLinks
          user={String(user)}
          sessionRole={String(sessionRole)}
        />
      </div>
    </nav>
  );
}
