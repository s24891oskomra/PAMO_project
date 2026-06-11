import { animalSchema } from "./animals-schemas";
import { validAnimal } from "@/tests/helpers/fixtures/animals";

describe("animalSchema", () => {
  it("accepts a valid animal payload", () => {
    expect(animalSchema.safeParse(validAnimal).success).toBe(true);
  });

  it("accepts animals without a main image", () => {
    const result = animalSchema.safeParse({ ...validAnimal, main_image: null });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.main_image).toBeNull();
    }
  });

  it("rejects invalid sex values", () => {
    expect(
      animalSchema.safeParse({ ...validAnimal, sex: "other" }).success,
    ).toBe(false);
  });

  it("rejects invalid status values", () => {
    expect(
      animalSchema.safeParse({ ...validAnimal, status: "retired" }).success,
    ).toBe(false);
  });

  it("rejects missing required fields", () => {
    const { name: _name, ...incomplete } = validAnimal;
    expect(animalSchema.safeParse(incomplete).success).toBe(false);
  });
});
