import Link from "next/link"
import Links from "./links/Links"
import { auth } from "@/lib/auth";

const Navbar = async () => {

  const session = await auth();

  console.log(session)
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