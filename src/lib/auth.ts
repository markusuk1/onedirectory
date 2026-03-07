import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import pool from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const result = await pool.query(
          "SELECT id, email, name, password_hash FROM operators WHERE email = $1",
          [credentials.email]
        );
        const operator = result.rows[0];
        if (!operator) return null;

        const valid = await bcrypt.compare(
          credentials.password as string,
          operator.password_hash
        );
        if (!valid) return null;

        return {
          id: operator.id,
          email: operator.email,
          name: operator.name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/operator/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
