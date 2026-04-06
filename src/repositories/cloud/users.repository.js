import {
  coerceUsersEntity,
  parseUsersEntity
} from "../../domain/types/cloud";
import {
  CLOUD_ENTITY_IDS,
  fetchCloudEntity,
  saveCloudEntity,
  subscribeToCloudEntities
} from "../../services/supabase.core";

function resolveTimestamp(value) {
  const parsed = Date.parse(value ?? "");
  return Number.isFinite(parsed) ? parsed : null;
}

function mergeUsers(currentState, incomingState) {
  const current = coerceUsersEntity(currentState);
  const incoming = coerceUsersEntity(incomingState);
  const userIds = new Set([
    ...Object.keys(current.usersById ?? {}),
    ...Object.keys(incoming.usersById ?? {})
  ]);
  const mergedUsersById = {};

  userIds.forEach((userId) => {
    const currentUser = current.usersById?.[userId] ?? {};
    const incomingUser = incoming.usersById?.[userId] ?? {};
    const currentUpdatedAt = resolveTimestamp(currentUser.updatedAt);
    const incomingUpdatedAt = resolveTimestamp(incomingUser.updatedAt);
    const shouldUseIncoming =
      currentUpdatedAt === null ||
      (incomingUpdatedAt !== null && incomingUpdatedAt >= currentUpdatedAt);
    const winner = shouldUseIncoming ? incomingUser : currentUser;
    const fallback = shouldUseIncoming ? currentUser : incomingUser;

    mergedUsersById[userId] = {
      ...fallback,
      ...winner,
      userId: winner.userId ?? fallback.userId ?? userId
    };
  });

  return {
    ...current,
    ...incoming,
    usersById: mergedUsersById
  };
}

async function loadUsers() {
  return parseUsersEntity(await fetchCloudEntity(CLOUD_ENTITY_IDS.users));
}

async function saveUsers(nextState) {
  await saveCloudEntity(CLOUD_ENTITY_IDS.users, coerceUsersEntity(nextState));
}

export const usersRepository = Object.freeze({
  load: loadUsers,

  save: saveUsers,

  subscribe(onChange) {
    if (typeof onChange !== "function") {
      return () => {};
    }

    return subscribeToCloudEntities([CLOUD_ENTITY_IDS.users], async () => {
      const nextState = await loadUsers();
      onChange(nextState);
    });
  },

  merge(currentState, incomingState) {
    return mergeUsers(currentState, incomingState);
  }
});
