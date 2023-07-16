import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_PUBLIC_KEY;
const options = {
  auth: {
    persistSession: false,
  },
};

const supabase = createClient(supabaseUrl, supabaseKey, options);

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("email", session.user.email);
      session.user.id = data[0].id.toString();
      console.log("Session callback session : ", JSON.stringify(session));

      return session;
    },
    async signIn({ profile }) {
      try {
        console.log(
          "User Signed in callback, profile : ",
          JSON.stringify(profile)
        );

        const { data, error } = await supabase
          .from("users")
          .select()
          .eq("email", profile.email);

        // if not, create a new document and save user in MongoDB
        if (data.length == 0) {
          const { error } = await supabase.from("users").insert({
            email: profile.email,
            username: profile.name,
            image: profile.picture,
          });

          if (error) {
            console.error(`Failed to add user ${profile.email} to database`);

            return false;
          }
          console.log(`Added user ${profile.email} to database`);
        } else {
          console.log(`User ${profile.email} exists in our database`);
        }

        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
