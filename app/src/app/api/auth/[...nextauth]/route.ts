import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Email from "next-auth/providers/email";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import { sendWelcomeEmail } from "@/lib/email";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Email({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.ADMIN_EMAIL,
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY as string,
  }),
  events: {
    signIn: async (message) => {
      if (message.isNewUser) {
        const user = message.user;
        sendWelcomeEmail(user.name as string, user.email as string);
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
