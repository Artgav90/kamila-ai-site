import { describe, expect, it } from "vitest";
import {
  createScheduleEntriesByTemplate,
  getBookingKey,
  getScheduleEntriesForDate,
  isSameDay
} from "./scheduleData";

describe("schedule reducers/selectors", () => {
  it("builds entries and returns classes for selected date", () => {
    const baseDate = new Date("2026-04-06T12:00:00");
    const entriesByDate = createScheduleEntriesByTemplate(
      [{ weekday: 1, type: "LATINA", start: "18:00" }],
      baseDate,
      1
    );
    const classes = getScheduleEntriesForDate(baseDate, entriesByDate);

    expect(classes).toHaveLength(1);
    expect(classes[0]).toMatchObject({
      type: "LATINA",
      start: "18:00"
    });
  });

  it("getBookingKey is stable for same date and class id", () => {
    const date = new Date("2026-04-06T12:00:00");

    expect(getBookingKey(date, "class-1")).toBe(getBookingKey(date, "class-1"));
    expect(getBookingKey(date, "class-1")).not.toBe(getBookingKey(date, "class-2"));
  });

  it("isSameDay compares only calendar day", () => {
    expect(
      isSameDay(
        new Date("2026-04-06T08:00:00"),
        new Date("2026-04-06T21:00:00")
      )
    ).toBe(true);
    expect(
      isSameDay(
        new Date("2026-04-06T23:59:00"),
        new Date("2026-04-07T00:01:00")
      )
    ).toBe(false);
  });
});
