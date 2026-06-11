/**
 * Zod schemas for authentication forms and API responses.
 *
 * @module auth-schemas
 * @category Authentication
 */
import { z } from "zod";

/** Validates login form input (email + password). */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Wpisz adres e-mail")
    .pipe(z.email("Niepoprawny format adresu e-mail")),
  password: z
    .string()
    .min(1, "Wpisz hasło")
    .min(6, "Hasło musi mieć co najmniej 6 znaków"),
});

/** Validates the user object returned after login. */
export const userSchema = z.object({
  id: z.string(),
  email: z.email(),
  first_name: z.string(),
  last_name: z.string(),
  role: z.enum([
    "system_admin",
    "shelter_admin",
    "employee",
    "volunteer",
    "vet",
  ]),
  shelter_id: z.string(),
});

/** Validates the login API response (tokens + user). */
export const loginResponseSchema = z.object({
  access: z.string(),
  refresh: z.string(),
  user: userSchema,
});

/** Validates the user permissions API response. */
export const userPermissionsSchema = z.object({
  user_id: z.string(),
  permissions: z.array(
    z.object({
      module: z.string(),
      label: z.string(),
      can_read: z.boolean(),
      can_create: z.boolean(),
      can_update: z.boolean(),
      can_delete: z.boolean(),
    }),
  ),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type UserSchema = z.infer<typeof userSchema>;
export type LoginResponseSchema = z.infer<typeof loginResponseSchema>;
export type UserPermissionsSchema = z.infer<typeof userPermissionsSchema>;
