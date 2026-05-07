export type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  shelter_id: string;
};
export type LoginResponse = {
  access: string;
  refresh: string;
  user: User;
};
