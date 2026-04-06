import { describe, expect, it } from "vitest";
import {
  DEFAULT_WEEKLY_SCHEDULE_TEMPLATE,
  getMonthMeta,
  normalizeWeeklyScheduleTemplate
} from "./scheduleData";

describe("schedule parsers", () => {
  it("normalizes, validates and de-duplicates weekly template entries", () => {
    const input = [
      { weekday: "1", type: "latina", start: "9:00" },
      { weekday: 1, type: "LATINA", start: "09:00" }, // duplicate after normalize
      { weekday: 6, type: "high heels", start: "13:00" },
      { weekday: 8, type: "LATINA", start: "10:00" }, // invalid weekday
      { weekday: 4, type: "KINDER", start: "25:00" } // invalid time
    ];

    const normalized = normalizeWeeklyScheduleTemplate(input);

    expect(normalized).toEqual([
      { weekday: 1, type: "LATINA", start: "09:00" },
      { weekday: 6, type: "HIGH HEELS", start: "13:00" }
    ]);
  });

  it("falls back to default template when every slot is invalid", () => {
    const normalized = normalizeWeeklyScheduleTemplate([
      { weekday: 0, type: "LATINA", start: "12:00" },
      { weekday: 7, type: "UNKNOWN", start: "99:99" }
    ]);

    expect(normalized).toEqual(DEFAULT_WEEKLY_SCHEDULE_TEMPLATE);
  });

  it("returns empty template in strict cloud mode when every slot is invalid", () => {
    const normalized = normalizeWeeklyScheduleTemplate(
      [
        { weekday: 0, type: "LATINA", start: "12:00" },
        { weekday: 7, type: "UNKNOWN", start: "99:99" }
      ],
      { fallbackToDefault: false }
    );

    expect(normalized).toEqual([]);
  });

  it("returns month label with capital first letter", () => {
    const { month, year } = getMonthMeta(new Date("2026-04-15T12:00:00"), "ru-RU");

    expect(month[0]).toBe(month[0].toUpperCase());
    expect(year).toBe("2026");
  });
});
