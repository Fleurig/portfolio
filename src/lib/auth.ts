import { betterAuth } from 'better-auth';
import Database from 'better-sqlite3';
import { admin } from 'better-auth/plugins';

export const auth = betterAuth({
  database: new Database(process.env.DATABASE_PATH ?? './portfolio.db'),
  secret: process.env.BETTER_AUTH_SECRET ?? 'dev-secret-please-change-in-production',
  baseURL: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  plugins: [
    admin({
      defaultRole: 'user',
    }),
  ],
  user: {
    additionalFields: {
      profileSlug: {
        type: 'string',
        required: false,
        defaultValue: '',
        input: true,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          // Auto-promote if email matches the designated super-admin
          if (process.env.ADMIN_EMAIL && user.email === process.env.ADMIN_EMAIL) {
            return { data: { ...user, role: 'admin' } };
          }
          return { data: user };
        },
      },
    },
  },
});

export type Session = typeof auth.$Infer.Session;
export type AuthUser = typeof auth.$Infer.Session.user & {
  role?: string;
  profileSlug?: string;
};
