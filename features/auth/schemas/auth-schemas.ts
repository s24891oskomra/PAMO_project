import { z } from "zod";

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
export const loginResponseSchema = z.object({
  access: z.string(),
  refresh: z.string(),
  user: userSchema,
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type UserSchema = z.infer<typeof userSchema>;
export type LoginResponseSchema = z.infer<typeof loginResponseSchema>;
