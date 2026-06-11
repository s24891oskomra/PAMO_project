import {
  loginResponseSchema,
  loginSchema,
  userSchema,
} from "./auth-schemas";
import {
  validLoginInput,
  validLoginResponse,
  validUser,
} from "@/tests/helpers/fixtures/auth";

const getErrorMessages = (error: { issues: { message: string }[] }) =>
  error.issues.map((issue) => issue.message);

describe("loginSchema", () => {
  it("accepts valid login input", () => {
    expect(loginSchema.safeParse(validLoginInput).success).toBe(true);
  });

  it("requires email", () => {
    const result = loginSchema.safeParse({ ...validLoginInput, email: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(getErrorMessages(result.error)).toContain("Wpisz adres e-mail");
    }
  });

  it("rejects invalid email format", () => {
    const result = loginSchema.safeParse({
      ...validLoginInput,
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(getErrorMessages(result.error)).toContain(
        "Niepoprawny format adresu e-mail",
      );
    }
  });

  it("requires password", () => {
    const result = loginSchema.safeParse({ ...validLoginInput, password: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(getErrorMessages(result.error)).toContain("Wpisz hasło");
    }
  });

  it("requires password with at least 6 characters", () => {
    const result = loginSchema.safeParse({
      ...validLoginInput,
      password: "12345",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(getErrorMessages(result.error)).toContain(
        "Hasło musi mieć co najmniej 6 znaków",
      );
    }
  });
});

describe("userSchema", () => {
  it("accepts a valid user payload", () => {
    expect(userSchema.safeParse(validUser).success).toBe(true);
  });

  it("rejects invalid role values", () => {
    const result = userSchema.safeParse({ ...validUser, role: "guest" });
    expect(result.success).toBe(false);
  });

  it("rejects missing required fields", () => {
    const { email: _email, ...incomplete } = validUser;
    expect(userSchema.safeParse(incomplete).success).toBe(false);
  });
});

describe("loginResponseSchema", () => {
  it("accepts a valid login response", () => {
    expect(loginResponseSchema.safeParse(validLoginResponse).success).toBe(
      true,
    );
  });

  it("rejects responses without tokens", () => {
    const { access: _access, ...withoutAccess } = validLoginResponse;
    expect(loginResponseSchema.safeParse(withoutAccess).success).toBe(false);
  });
});
