import Link from "next/link"

const links = [
  {
    title: "Home",
    path: "/",
  },
];

const Navbar = async () => {
  
  return (
    <div>
      <Link href="/">CRUD APP</Link>
      <div>
        {links.map((item) => (
          <Link href={item.path} key={item.path}>
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Navbar