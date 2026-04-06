import { describe, expect, it } from "vitest";
import {
  buildCrmMetrics,
  buildSearchCollections,
  localizeActivities,
  normalizeCrmState
} from "./crmGateway";

const lt = (ruText) => ruText;

describe("crm reducers/selectors", () => {
  it("normalizeCrmState applies safe defaults", () => {
    const normalized = normalizeCrmState({
      monthlyRevenue: "1500",
      checkinsTodayBoost: undefined,
      customActivities: "bad",
      settings: { notifications: false }
    });

    expect(normalized).toEqual({
      monthlyRevenue: 1500,
      checkinsTodayBoost: 0,
      customActivities: [],
      lastPanel: "dashboard",
      settings: {
        notifications: false,
        "daily-report": true,
        "auto-open-students": false
      }
    });
  });

  it("buildSearchCollections filters students and activities by query", () => {
    const collections = buildSearchCollections(
      [
        { studentId: "STD-1", name: "Anna", email: "anna@test.com" },
        { studentId: "STD-2", name: "Boris", email: "boris@test.com" }
      ],
      [
        { id: "a1", text: "Anna checkin", time: "just now" },
        { id: "a2", text: "Payment from Boris", time: "just now" }
      ],
      "ann"
    );

    expect(collections.visibleStudents).toHaveLength(1);
    expect(collections.searchStudentResults[0].name).toBe("Anna");
    expect(collections.searchActivityResults).toHaveLength(1);
    expect(collections.searchActivityResults[0].id).toBe("a1");
  });

  it("buildCrmMetrics builds values for revenue/students/checkins", () => {
    const metrics = buildCrmMetrics({
      metricCards: [
        { id: "monthly-revenue" },
        { id: "active-students" },
        { id: "checkins-today" },
        { id: "low-expired" }
      ],
      students: [
        {
          classesCount: 2,
          membershipRenewal: "expires May 30",
          lastCheckInAt: new Date().toISOString()
        },
        {
          classesCount: 0,
          membershipRenewal: "expired",
          lastCheckInAt: null
        }
      ],
      checkinsTodayBoost: 1,
      monthlyRevenue: 3200,
      lt
    });

    expect(metrics[0].value).toBe("€3,200");
    expect(metrics[1].value).toBe("2");
    expect(metrics[2].value).toBe("2");
    expect(metrics[3].value).toBe("1");
  });

  it("localizeActivities translates just-now label", () => {
    const localized = localizeActivities(
      [{ id: "act-1", color: "rgb(255, 95, 160)", text: "x", time: "just-now" }],
      lt
    );

    expect(localized[0].time).toBe("Только что");
    expect(localized[0].tint).toContain("rgba");
  });
});
