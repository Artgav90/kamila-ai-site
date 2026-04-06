import { describe, expect, it } from "vitest";
import { __cloudSyncTestUtils, subscribeToCloudEntities } from "./supabase";

const { CLOUD_ENTITY_IDS, extractLegacyEntityPayload, normalizeLegacyCloudPayload } =
  __cloudSyncTestUtils;

describe("supabase cloud sync migration helpers", () => {
  it("normalizes legacy student payload into marker+slices format", () => {
    const legacyStudentState = {
      studentsById: {
        "STD-1": { studentId: "STD-1", name: "Alice" }
      }
    };

    const normalized = normalizeLegacyCloudPayload(legacyStudentState);

    expect(normalized.__topdance_cloud_state).toBe(1);
    expect(normalized.slices.student).toEqual(legacyStudentState);
  });

  it("extracts admin state from legacy crm slice without customActivities/settings", () => {
    const legacyPayload = {
      slices: {
        crm: {
          monthlyRevenue: 1200,
          checkinsTodayBoost: 3,
          lastPanel: "dashboard",
          customActivities: [{ id: "act-1", text: "hello" }],
          settings: { notifications: true }
        }
      }
    };

    const adminEntity = extractLegacyEntityPayload(CLOUD_ENTITY_IDS.admin, legacyPayload);

    expect(adminEntity).toEqual({
      monthlyRevenue: 1200,
      checkinsTodayBoost: 3,
      lastPanel: "dashboard"
    });
  });

  it("extracts cloud settings by merging legacy language and crm settings", () => {
    const legacyPayload = {
      slices: {
        language: "de",
        crm: {
          settings: {
            notifications: false,
            "daily-report": true
          }
        }
      }
    };

    const settingsEntity = extractLegacyEntityPayload(CLOUD_ENTITY_IDS.settings, legacyPayload);

    expect(settingsEntity).toEqual({
      language: "de",
      crm: {
        notifications: false,
        "daily-report": true
      }
    });
  });

  it("returns noop unsubscribe when realtime client is unavailable", () => {
    const unsubscribe = subscribeToCloudEntities(["students"], () => {});
    expect(typeof unsubscribe).toBe("function");
    expect(() => unsubscribe()).not.toThrow();
  });
});
