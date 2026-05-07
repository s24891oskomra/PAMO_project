export type WalkAnimal = {
  id: string;
  name: string;
  mainImageUrl?: string;
};

export type WalkUser = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
};

export type Walk = {
  id: string;
  animal: WalkAnimal;
  walked_by: WalkUser | null;
  walk_start: string;
  walk_end: string | null;
  duration_minutes: number | null;
  notes: string;
  created_at: string;
  updated_at: string;
};

export type WaitingWalk = {
  image_url: string | null;
  name: string;
  hours_since_last_walk: number;
  days_since_last_walk: number;
};
