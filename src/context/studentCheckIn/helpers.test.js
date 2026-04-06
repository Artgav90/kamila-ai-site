import { describe, expect, it } from "vitest";
import {
  calculateClassesLeft,
  mergeStateWithFallback,
  parseStudentIdFromQrPayload
} from "./helpers";

describe("student reducers/selectors helpers", () => {
  it("calculateClassesLeft never goes below zero", () => {
    expect(calculateClassesLeft({ totalClasses: 5, usedClasses: 2 })).toBe(3);
    expect(calculateClassesLeft({ totalClasses: 3, usedClasses: 5 })).toBe(0);
  });

  it("mergeStateWithFallback keeps cloud students without adding demo records", () => {
    const merged = mergeStateWithFallback({
      studentsById: {
        "STD-X": {
          studentId: "STD-X",
          name: "Cloud Student",
          totalClasses: 8,
          usedClasses: 1
        }
      }
    });

    expect(merged.studentsById["STD-X"]).toMatchObject({
      studentId: "STD-X",
      name: "Cloud Student",
      totalClasses: 8,
      usedClasses: 1
    });
    expect(Object.keys(merged.studentsById)).toEqual(["STD-X"]);
  });

  it("parseStudentIdFromQrPayload supports json, url and plain id", () => {
    expect(parseStudentIdFromQrPayload('{"studentId":"std-123"}')).toBe("STD-123");
    expect(parseStudentIdFromQrPayload('{"userId":"usr-77"}')).toBe("USR-77");
    expect(
      parseStudentIdFromQrPayload("https://example.com/checkin?student=std-xyz")
    ).toBe("STD-XYZ");
    expect(
      parseStudentIdFromQrPayload("https://example.com/checkin?userId=usr-abcd")
    ).toBe("USR-ABCD");
    expect(parseStudentIdFromQrPayload(" std-777 ")).toBe("STD-777");
  });
});
