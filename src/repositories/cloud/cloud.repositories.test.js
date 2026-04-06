import { describe, expect, it } from "vitest";
import {
  crmRepository,
  scheduleRepository,
  settingsRepository,
  studentsRepository,
  usersRepository
} from "./index";

describe("cloud repositories contract", () => {
  it("studentsRepository.merge merges studentsById", () => {
    const merged = studentsRepository.merge(
      {
        studentsById: {
          "STD-1": { studentId: "STD-1", name: "Anna" }
        }
      },
      {
        studentsById: {
          "STD-2": { studentId: "STD-2", name: "Boris" }
        }
      }
    );

    expect(Object.keys(merged.studentsById)).toEqual(["STD-1", "STD-2"]);
  });

  it("studentsRepository.merge resolves realtime conflict between two devices", () => {
    const merged = studentsRepository.merge(
      {
        studentsById: {
          "STD-1": {
            studentId: "STD-1",
            name: "Anna",
            phone: "+49 111",
            usedClasses: 3,
            totalClasses: 10,
            totalVisits: 20,
            monthsInClub: 4,
            lastCheckInAt: "2026-04-04T08:00:00.000Z"
          }
        }
      },
      {
        studentsById: {
          "STD-1": {
            studentId: "STD-1",
            name: "Anna K.",
            email: "anna@example.com",
            usedClasses: 2,
            totalClasses: 9,
            totalVisits: 19,
            monthsInClub: 3,
            lastCheckInAt: "2026-04-04T07:50:00.000Z"
          }
        }
      }
    );

    expect(merged.studentsById["STD-1"]).toMatchObject({
      name: "Anna K.",
      phone: "+49 111",
      email: "anna@example.com",
      usedClasses: 3,
      totalClasses: 10,
      totalVisits: 20,
      monthsInClub: 4,
      lastCheckInAt: "2026-04-04T08:00:00.000Z"
    });
  });

  it("settingsRepository.merge keeps language and deep-merges crm settings", () => {
    const merged = settingsRepository.merge(
      {
        language: "ru",
        crm: { notifications: true }
      },
      {
        crm: { "daily-report": true }
      }
    );

    expect(merged.language).toBe("ru");
    expect(merged.crm).toEqual({
      notifications: true,
      "daily-report": true
    });
  });

  it("scheduleRepository.merge unions bookings for offline -> reconnect", () => {
    const merged = scheduleRepository.merge(
      {
        activeFilter: "LATINA",
        bookedClassKeys: ["a"],
        weeklyTemplate: [{ weekday: 1, type: "LATINA", start: "18:00" }]
      },
      {
        bookedClassKeys: ["b"],
        weeklyTemplate: [{ weekday: 2, type: "HIGH HEELS", start: "20:00" }]
      }
    );

    expect(merged.bookedClassKeys).toEqual(["a", "b"]);
    expect(merged.weeklyTemplate).toEqual([
      { weekday: 2, type: "HIGH HEELS", start: "20:00" }
    ]);
  });

  it("crmRepository.merge keeps activity history from two devices", () => {
    const merged = crmRepository.merge(
      {
        monthlyRevenue: 100,
        customActivities: [{ id: "a", type: "x", color: "#111", text: "A", time: "now" }],
        settings: { notifications: true }
      },
      {
        checkinsTodayBoost: 3,
        customActivities: [{ id: "b", type: "y", color: "#222", text: "B", time: "now" }],
        settings: { "daily-report": true }
      }
    );

    expect(merged.monthlyRevenue).toBe(100);
    expect(merged.checkinsTodayBoost).toBe(3);
    expect(merged.customActivities).toEqual([
      { id: "b", type: "y", color: "#222", text: "B", time: "now" },
      { id: "a", type: "x", color: "#111", text: "A", time: "now" }
    ]);
    expect(merged.settings).toEqual({
      notifications: true,
      "daily-report": true
    });
  });

  it("usersRepository.merge keeps the latest user profile update", () => {
    const merged = usersRepository.merge(
      {
        usersById: {
          "USR-1": {
            userId: "USR-1",
            fullName: "Anna",
            phoneNumber: "+49 111",
            phoneNormalized: "49111",
            updatedAt: "2026-04-05T09:00:00.000Z"
          }
        }
      },
      {
        usersById: {
          "USR-1": {
            userId: "USR-1",
            fullName: "Anna K.",
            phoneNumber: "+49 111",
            phoneNormalized: "49111",
            updatedAt: "2026-04-05T09:10:00.000Z"
          }
        }
      }
    );

    expect(merged.usersById["USR-1"].fullName).toBe("Anna K.");
  });
});
