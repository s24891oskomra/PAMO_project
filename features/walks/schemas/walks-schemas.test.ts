import {
  createWalkRequestSchema,
  waitingWalkResponseSchema,
  walkResponseSchema,
} from "./walks-schemas";
import {
  validCreateWalkRequest,
  validWaitingWalk,
  validWalk,
} from "@/tests/helpers/fixtures/walks";

describe("walkResponseSchema", () => {
  it("accepts a valid walk payload", () => {
    expect(walkResponseSchema.safeParse(validWalk).success).toBe(true);
  });

  it("accepts walks without a walker assigned", () => {
    const result = walkResponseSchema.safeParse({
      ...validWalk,
      walked_by: null,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.walked_by).toBeNull();
    }
  });

  it("accepts walks without an animal image url", () => {
    const result = walkResponseSchema.safeParse({
      ...validWalk,
      animal: { id: "animal-1", name: "Burek" },
    });
    expect(result.success).toBe(true);
  });

  it("rejects missing required fields", () => {
    const { walk_start: _walkStart, ...incomplete } = validWalk;
    expect(walkResponseSchema.safeParse(incomplete).success).toBe(false);
  });
});

describe("waitingWalkResponseSchema", () => {
  it("accepts a valid waiting walk payload", () => {
    expect(waitingWalkResponseSchema.safeParse(validWaitingWalk).success).toBe(
      true,
    );
  });

  it("accepts waiting walks without an image url", () => {
    const result = waitingWalkResponseSchema.safeParse({
      ...validWaitingWalk,
      image_url: null,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.image_url).toBeNull();
    }
  });

  it("rejects invalid field types", () => {
    expect(
      waitingWalkResponseSchema.safeParse({
        ...validWaitingWalk,
        hours_since_last_walk: "26",
      }).success,
    ).toBe(false);
  });
});

describe("createWalkRequestSchema", () => {
  it("accepts a valid create walk request", () => {
    expect(
      createWalkRequestSchema.safeParse(validCreateWalkRequest).success,
    ).toBe(true);
  });

  it("rejects requests without animal_id", () => {
    const { animal_id: _animalId, ...incomplete } = validCreateWalkRequest;
    expect(createWalkRequestSchema.safeParse(incomplete).success).toBe(false);
  });
});
