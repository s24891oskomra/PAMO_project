import type { Walk } from "@/features/walks/types/walks-types";

export const validWalk: Walk = {
  id: "walk-1",
  animal: {
    id: "animal-1",
    name: "Kira",
    mainImageUrl: "https://example.com/kira.jpg",
  },
  walked_by: {
    id: "user-1",
    first_name: "Jan",
    last_name: "Kowalski",
    email: "jan@example.com",
  },
  walk_start: "2024-03-15T10:30:00",
  walk_end: null,
  duration_minutes: null,
  notes: "",
  created_at: "2024-03-15T10:30:00",
  updated_at: "2024-03-15T10:30:00",
};

export const validWaitingWalk = {
  id: "animal-1",
  image_url: "https://example.com/kira.jpg",
  name: "Kira",
  hours_since_last_walk: 26,
  days_since_last_walk: 1,
};

export const validCreateWalkRequest = {
  animal_id: "animal-1",
  walked_by_id: "user-1",
  walk_start: "2024-03-15T10:30:00",
  walk_end: null,
  notes: "",
};
