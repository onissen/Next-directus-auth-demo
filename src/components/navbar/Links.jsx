"use client";
import NavLink from "./navLink";
import { handleLogout } from "@/lib/action";

const links = [
  {
    title: "Home",
    path: "/",
  },
];

const Links = ({session}) => {


  return (
    <div>
      <div>
        {links.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}
        {session?.user ? (
          <>
            <form action={handleLogout}>
              <button>Sign out</button>
            </form>
          </>
        ) : (
          <NavLink item={{ title: "Sign in", path: "/login" }} />
        )}
      </div>
    </div>
  );
};

export default Links;
