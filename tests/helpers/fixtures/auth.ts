export const validLoginInput = {
  email: "shelter.admin.krk@example.com",
  password: "secret123",
};

export const validUser = {
  id: "user-1",
  email: "shelter.admin.krk@example.com",
  first_name: "Jan",
  last_name: "Kowalski",
  role: "shelter_admin" as const,
  shelter_id: "shelter-1",
};

export const validLoginResponse = {
  access: "access-token",
  refresh: "refresh-token",
  user: validUser,
};
