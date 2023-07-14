import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      console.log("Session callback session : ", JSON.stringify(session));
      return session;
    },
    async signIn({ profile }) {
      try {
        console.log(
          "User Signed in callback, profile : ",
          JSON.stringify(profile)
        );
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
