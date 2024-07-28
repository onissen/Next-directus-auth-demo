import { handleLogout } from "@/lib/action"
import Link from "next/link"

export default function LoginButton({session}) {
    if (session?.user) {
        return (
            <>
            <p>Hallo {session.user.first_name+' '+session.user.last_name}</p>
            <form action={handleLogout}>
                <button>Sign out</button>
            </form>
            </>
        )
    }
    return (
        <Link href='/login'>
            Login
        </Link>
    )
}