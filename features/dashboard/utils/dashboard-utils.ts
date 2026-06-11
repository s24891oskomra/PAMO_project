/**
 * Dashboard statistics helpers derived from walk data.
 *
 * @module dashboard-utils
 * @category Dashboard
 */
import type { Walk } from "@/features/walks/types/walks-types";
import { isSameDay } from "@/features/walks/utils/walks-utils";

/** Filters walks to those walked by the given user. */
export const getMyWalks = (
  walks: Walk[] | undefined,
  userId: string | undefined,
): Walk[] => {
  if (!walks || !userId) return [];

  return walks.filter((walk) => walk.walked_by?.id === userId);
};

/** Returns the first walk without an end time, if any. */
export const getActiveWalk = (walks: Walk[]): Walk | undefined => {
  return walks.find((walk) => !walk.walk_end);
};

/** Counts walks that started on the same calendar day as `referenceDate`. */
export const countWalksToday = (
  walks: Walk[],
  referenceDate = new Date(),
): number => {
  return walks.filter((walk) => isSameDay(walk.walk_start, referenceDate))
    .length;
};
