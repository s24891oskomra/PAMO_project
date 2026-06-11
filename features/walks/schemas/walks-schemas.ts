import { z } from "zod";

export const walkResponseSchema = z.object({
  id: z.string(),
  animal: z.object({
    id: z.string(),
    name: z.string(),
    mainImageUrl: z.string().optional(),
  }),
  walked_by: z
    .object({
      id: z.string(),
      first_name: z.string(),
      last_name: z.string(),
      email: z.string(),
    })
    .nullable(),
  walk_start: z.string(),
  walk_end: z.string().nullable(),
  duration_minutes: z.number().nullable(),
  notes: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const waitingWalkResponseSchema = z.object({
  id: z.string(),
  image_url: z.string().nullable(),
  name: z.string(),
  hours_since_last_walk: z.number().nullable(),
  days_since_last_walk: z.number().nullable(),
});

export const createWalkRequestSchema = z.object({
  animal_id: z.string(),
  walked_by_id: z.string(),
  walk_start: z.string(),
  walk_end: z.string().nullable(),
  notes: z.string(),
});

export type CreateWalkRequestSchema = z.infer<typeof createWalkRequestSchema>;
export type WalkResponseSchema = z.infer<typeof walkResponseSchema>;
export type WaitingWalkResponseSchema = z.infer<
  typeof waitingWalkResponseSchema
>;
