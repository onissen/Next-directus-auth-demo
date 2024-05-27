import Link from "next/link"
import Links from "./Links"
import { auth } from "@/lib/auth";

const Navbar = async () => {

  const session = await auth();
  return (
    <div>
      <Link href="/">CRUD APP</Link>
      <div>
        <Links session={session}/>
      </div>
    </div>
  )
}

export default Navbar