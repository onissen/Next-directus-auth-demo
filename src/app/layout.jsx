import Navbar from "@/components/navbar/Navbar";

export const metadata = {
  title: {
    default:"Next.js 14 Homepage",
  },
  description: "Next.js Directus app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <div>
            <Navbar />
            {children}
          </div>
      </body>
    </html>
  );
}
