import { validWalk } from "@/tests/helpers/fixtures/walks";
import type { Walk } from "@/features/walks/types/walks-types";
import {
  countWalksToday,
  getActiveWalk,
  getMyWalks,
} from "./dashboard-utils";

const otherUserWalk: Walk = {
  ...validWalk,
  id: "walk-2",
  walked_by: {
    id: "user-2",
    first_name: "Anna",
    last_name: "Nowak",
    email: "anna@example.com",
  },
};

const completedWalk: Walk = {
  ...validWalk,
  id: "walk-3",
  walk_end: "2024-03-15T11:00:00",
  duration_minutes: 60,
};

describe("getMyWalks", () => {
  it("returns walks assigned to the current user", () => {
    const walks = [validWalk, otherUserWalk];

    expect(getMyWalks(walks, "user-1")).toEqual([validWalk]);
  });

  it("returns an empty array when walks are undefined", () => {
    expect(getMyWalks(undefined, "user-1")).toEqual([]);
  });

  it("returns an empty array when user id is undefined", () => {
    expect(getMyWalks([validWalk], undefined)).toEqual([]);
  });

  it("excludes walks without a walker assigned", () => {
    const unassignedWalk: Walk = { ...validWalk, walked_by: null };

    expect(getMyWalks([unassignedWalk], "user-1")).toEqual([]);
  });
});

describe("getActiveWalk", () => {
  it("returns the walk that has not ended yet", () => {
    expect(getActiveWalk([completedWalk, validWalk])).toEqual(validWalk);
  });

  it("returns undefined when all walks are completed", () => {
    expect(getActiveWalk([completedWalk])).toBeUndefined();
  });

  it("returns undefined for an empty list", () => {
    expect(getActiveWalk([])).toBeUndefined();
  });
});

describe("countWalksToday", () => {
  const referenceDate = new Date(2024, 2, 15, 18, 0, 0);

  it("counts walks that started on the reference day", () => {
    const walks = [
      validWalk,
      { ...validWalk, id: "walk-4", walk_start: "2024-03-15T08:00:00" },
      {
        ...validWalk,
        id: "walk-5",
        walk_start: "2024-03-16T08:00:00",
      },
    ];

    expect(countWalksToday(walks, referenceDate)).toBe(2);
  });

  it("returns zero when no walks happened on the reference day", () => {
    const walks = [
      { ...validWalk, walk_start: "2024-03-14T10:00:00" },
      { ...validWalk, id: "walk-6", walk_start: "2024-03-16T10:00:00" },
    ];

    expect(countWalksToday(walks, referenceDate)).toBe(0);
  });

  it("returns zero for an empty list", () => {
    expect(countWalksToday([], referenceDate)).toBe(0);
  });
});
