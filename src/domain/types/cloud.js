import { z } from "zod";

const SCHEDULE_TYPES = ["KINDER", "PROF KINDER", "LATINA", "HIGH HEELS"];
const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

export const LanguageSchema = z.enum(["ru", "de"]);
export const UserRoleSchema = z.enum(["admin", "student"]);
export const CrmSettingsSchema = z.object({
  notifications: z.boolean().optional(),
  "daily-report": z.boolean().optional(),
  "auto-open-students": z.boolean().optional()
}).passthrough();
export const RegistrationCodesSchema = z.object({
  admin: z.string().min(1),
  student: z.string().min(1)
}).passthrough();

export const CloudSettingsSchema = z.object({
  language: LanguageSchema.optional(),
  crm: CrmSettingsSchema.optional(),
  registrationCodes: RegistrationCodesSchema.optional()
}).passthrough();

export const ScheduleTypeSchema = z.enum(SCHEDULE_TYPES);
export const WeeklyScheduleSlotSchema = z.object({
  weekday: z.number().int().min(1).max(7),
  type: ScheduleTypeSchema,
  start: z.string().regex(TIME_PATTERN)
}).passthrough();

export const ScheduleCloudStateSchema = z.object({
  activeFilter: ScheduleTypeSchema.nullable().optional(),
  bookedClassKeys: z.array(z.string()).optional(),
  weeklyTemplate: z.array(WeeklyScheduleSlotSchema).optional()
}).passthrough();

export const CrmActivitySchema = z.object({
  id: z.string().min(1),
  type: z.string().min(1),
  color: z.string().min(1),
  text: z.string().min(1),
  time: z.string().min(1),
  tint: z.string().optional()
}).passthrough();

export const CrmActivitiesEntitySchema = z.array(CrmActivitySchema);
export const AdminEntitySchema = z.object({
  monthlyRevenue: z.number().finite().optional(),
  checkinsTodayBoost: z.number().finite().optional(),
  lastPanel: z.string().optional()
}).passthrough();
const CloudUserEntrySchema = z.object({
  userId: z.string().min(1),
  role: UserRoleSchema.optional(),
  fullName: z.string().min(1),
  phoneNumber: z.string().min(1),
  phoneNormalized: z.string().min(1),
  clubCode: z.string().optional(),
  clubCodeNormalized: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  lastLoginAt: z.string().nullable().optional()
}).passthrough();

export const UsersEntitySchema = z.object({
  usersById: z.record(z.string(), CloudUserEntrySchema)
}).passthrough();

const StudentCloudEntrySchema = z.object({
  studentId: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  membershipLabel: z.string().optional(),
  membershipRenewal: z.string().optional(),
  totalClasses: z.number().int().nonnegative().optional(),
  usedClasses: z.number().int().nonnegative().optional(),
  totalVisits: z.number().int().nonnegative().optional(),
  monthsInClub: z.number().int().nonnegative().optional(),
  lastCheckInAt: z.string().nullable().optional()
}).passthrough();

export const StudentsEntitySchema = z.object({
  studentsById: z.record(z.string(), StudentCloudEntrySchema)
}).passthrough();

export const LegacyCrmSliceSchema = z.object({
  monthlyRevenue: z.number().finite().optional(),
  checkinsTodayBoost: z.number().finite().optional(),
  customActivities: z.array(CrmActivitySchema).optional(),
  lastPanel: z.string().optional(),
  settings: CrmSettingsSchema.optional()
}).passthrough();

/**
 * @typedef {import("zod").infer<typeof StudentsEntitySchema>} StudentsEntity
 * @typedef {import("zod").infer<typeof AdminEntitySchema>} AdminEntity
 * @typedef {import("zod").infer<typeof ScheduleCloudStateSchema>} ScheduleCloudState
 * @typedef {import("zod").infer<typeof CrmActivitySchema>} CrmActivity
 * @typedef {import("zod").infer<typeof CrmActivitiesEntitySchema>} CrmActivitiesEntity
 * @typedef {import("zod").infer<typeof CloudSettingsSchema>} CloudSettings
 * @typedef {import("zod").infer<typeof UsersEntitySchema>} UsersEntity
 * @typedef {import("zod").infer<typeof LegacyCrmSliceSchema>} LegacyCrmSlice
 */

function parseOrNull(schema, value, entityName) {
  if (value === null || typeof value === "undefined") {
    return null;
  }

  const parsed = schema.safeParse(value);
  if (parsed.success) {
    return parsed.data;
  }

  console.warn(`[domain/types] Invalid "${entityName}" payload.`, parsed.error.issues);
  return null;
}

function parseOrFallback(schema, value, fallbackValue, entityName) {
  const parsed = parseOrNull(schema, value, entityName);
  return parsed ?? fallbackValue;
}

export function parseLanguage(value) {
  return parseOrNull(LanguageSchema, value, "language");
}

export function parseStudentsEntity(value) {
  return parseOrNull(StudentsEntitySchema, value, "students");
}

export function parseAdminEntity(value) {
  return parseOrNull(AdminEntitySchema, value, "admin");
}

export function parseScheduleEntity(value) {
  return parseOrNull(ScheduleCloudStateSchema, value, "schedule");
}

export function parseCrmActivitiesEntity(value) {
  return parseOrNull(CrmActivitiesEntitySchema, value, "crm_activities");
}

export function parseSettingsEntity(value) {
  return parseOrNull(CloudSettingsSchema, value, "settings");
}

export function parseUsersEntity(value) {
  return parseOrNull(UsersEntitySchema, value, "users");
}

export function parseLegacyCrmSlice(value) {
  return parseOrNull(LegacyCrmSliceSchema, value, "legacy_crm");
}

export function coerceStudentsEntity(value) {
  return parseOrFallback(StudentsEntitySchema, value, { studentsById: {} }, "students");
}

export function coerceAdminEntity(value) {
  return parseOrFallback(AdminEntitySchema, value, {}, "admin");
}

export function coerceScheduleEntity(value) {
  return parseOrFallback(ScheduleCloudStateSchema, value, {}, "schedule");
}

export function coerceCrmActivitiesEntity(value) {
  return parseOrFallback(CrmActivitiesEntitySchema, value, [], "crm_activities");
}

export function coerceSettingsEntity(value) {
  return parseOrFallback(CloudSettingsSchema, value, {}, "settings");
}

export function coerceUsersEntity(value) {
  return parseOrFallback(UsersEntitySchema, value, { usersById: {} }, "users");
}

export function coerceLegacyCrmSlice(value) {
  return parseOrFallback(LegacyCrmSliceSchema, value, {}, "legacy_crm");
}
