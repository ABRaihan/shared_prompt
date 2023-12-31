import { User } from "@models/mongoose";
import { UserSchema } from "@models/typescript/user";
import { connectToDB } from "@utils";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGlE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user?.email,
      });
      if (session.user) {
        (session.user as UserSchema).id = sessionUser._id.toString();
      }
      return session;
    },

    async signIn({ profile }) {
      try {
        await connectToDB();
        const userExists = await User.findOne({ email: profile?.email });
        if (!userExists) {
          const userProfile = { ...profile } as any;
          await User.create({
            email: profile?.email,
            username: profile?.name?.replaceAll(" ", "").toLowerCase(),
            image: userProfile?.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});
export { handler as GET, handler as POST };
