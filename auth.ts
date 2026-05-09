import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: db ? DrizzleAdapter(db) : undefined,
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID ?? "demo-client-id",
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? "demo-client-secret",
    }),
  ],
  session: { strategy: db ? "database" : "jwt" },
  trustHost: true,
});
