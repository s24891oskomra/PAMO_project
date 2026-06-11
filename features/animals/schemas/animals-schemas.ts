import { z } from "zod";

export const animalSchema = z.object({
  id: z.string(),
  name: z.string(),
  species: z.object({
    id: z.string(),
    name: z.string(),
  }),
  breed: z.object({
    id: z.string(),
    name: z.string(),
    species_id: z.string(),
  }),
  sex: z.enum(["male", "female", "unknown"]),
  status: z.enum([
    "intake",
    "quarantine",
    "available",
    "reserved",
    "adopted",
    "deceased",
    "transferred",
    "lost",
  ]),
  main_image: z
    .object({
      id: z.string(),
      url: z.string(),
      annotation: z.string(),
    })
    .nullable(),
});
