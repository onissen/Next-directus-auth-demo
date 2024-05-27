import { cookies } from 'next/headers'
import directus from "./directus";
import { readMe, withToken } from "@directus/sdk";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        const userData = await directus.request(
          withToken(
            user.data.access_token,
            readMe({
              fields: ["id", "first_name", "last_name", "email"],
            })
          )
        );
        const formatedData = JSON.stringify(userData)
      cookies().set("auth_user", formatedData )
        return {
          ...token,
          accessToken: user.data.access_token,
          refreshToken: user.data.refresh_token,
          user: userData,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.first_name = token.user.first_name
        session.user.last_name = token.user.last_name
        session.user.email = token.user.email
      }
      return session;
    },
    authorized({ auth, request }) {
      const user = auth?.user;
      const isOnCreatePostPage =
        request.nextUrl?.pathname.startsWith("/create-post");
      const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");

      // ONLY AUTHENTICATED USERS CAN REACH THE CREATE POST PAGE
      if (isOnCreatePostPage && !user) {
        return false;
      }

      // ONLY UNAUTHENTICATED USERS CAN REACH THE LOGIN PAGE
      if (isOnLoginPage && user) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      return true;
    },
  },
};
