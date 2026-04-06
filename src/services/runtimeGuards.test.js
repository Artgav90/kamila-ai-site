import { describe, expect, it } from "vitest";
import { isSameCalendarDay, safeArray, safeLower, startOfToday } from "./runtimeGuards";

describe("runtime guards", () => {
  it("safeArray returns empty array for invalid values", () => {
    expect(safeArray(null)).toEqual([]);
    expect(safeArray("bad")).toEqual([]);
  });

  it("safeLower tolerates missing values", () => {
    expect(safeLower(null)).toBe("");
    expect(safeLower("Anna")).toBe("anna");
  });

  it("isSameCalendarDay matches valid timestamps only", () => {
    const today = startOfToday();
    expect(isSameCalendarDay(today.toISOString(), today)).toBe(true);
    expect(isSameCalendarDay("not-a-date", today)).toBe(false);
  });
});
