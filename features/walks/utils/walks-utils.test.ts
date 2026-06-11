import {
  buildAnimalImageMap,
  formatDate,
  formatTime,
  isSameDay,
  parseWalkDate,
} from "./walks-utils";

describe("buildAnimalImageMap", () => {
  it("maps animal ids to main image urls", () => {
    const map = buildAnimalImageMap([
      { id: "a1", main_image: { url: "https://example.com/a1.jpg" } },
      { id: "a2", main_image: null },
      { id: "a3", main_image: { url: "https://example.com/a3.jpg" } },
    ]);

    expect(map.get("a1")).toBe("https://example.com/a1.jpg");
    expect(map.has("a2")).toBe(false);
    expect(map.get("a3")).toBe("https://example.com/a3.jpg");
  });

  it("returns an empty map when animals are undefined", () => {
    expect(buildAnimalImageMap(undefined).size).toBe(0);
  });
});

describe("parseWalkDate", () => {
  it("parses ISO datetime strings", () => {
    const result = parseWalkDate("2024-03-15T10:30:00");

    expect(result).toBeInstanceOf(Date);
    expect(result?.getFullYear()).toBe(2024);
    expect(result?.getMonth()).toBe(2);
    expect(result?.getDate()).toBe(15);
  });

  it("normalizes space-separated datetimes", () => {
    const iso = parseWalkDate("2024-03-15T10:30:00");
    const spaced = parseWalkDate("2024-03-15 10:30:00");

    expect(spaced?.getTime()).toBe(iso?.getTime());
  });

  it("returns null for invalid dates", () => {
    expect(parseWalkDate("not-a-date")).toBeNull();
  });
});

describe("formatDate", () => {
  it("returns dash for invalid dates", () => {
    expect(formatDate("invalid")).toBe("-");
  });

  it("formats valid dates in pl-PL", () => {
    expect(formatDate("2024-03-15T10:30:00")).toMatch(/15\.03\.2024/);
  });
});

describe("formatTime", () => {
  it("returns dash for invalid dates", () => {
    expect(formatTime("invalid")).toBe("-");
  });

  it("formats valid times in pl-PL", () => {
    expect(formatTime("2024-03-15T10:30:00")).toMatch(/10:30/);
  });
});

describe("isSameDay", () => {
  it("returns true when dates share the same calendar day", () => {
    const reference = new Date(2024, 2, 15, 18, 0, 0);

    expect(isSameDay("2024-03-15T08:00:00", reference)).toBe(true);
  });

  it("returns false for different days", () => {
    const reference = new Date(2024, 2, 15);

    expect(isSameDay("2024-03-16T08:00:00", reference)).toBe(false);
  });

  it("returns false for invalid input", () => {
    expect(isSameDay("invalid", new Date())).toBe(false);
  });
});
