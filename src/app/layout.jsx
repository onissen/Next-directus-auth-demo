import LoginButton from "@/components/loginButton";
import Navbar from "@/components/navbar/Navbar";
import { auth } from "@/lib/auth";

export const metadata = {
  title: {
    default:"Next.js 14 Homepage",
  },
  description: "Next.js Directus app",
};

const RootLayout = async ({ children }) => {
  const session = await auth();
  return (
    <html lang="en">
      <body>
          <div>
            {session && (
              <>              
                <Navbar />
                <LoginButton session={session} />
              </>
            )}
            {children}
          </div>
      </body>
    </html>
  );
}

export default RootLayout;
