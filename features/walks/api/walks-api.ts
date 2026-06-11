/**
 * Walk management API — list, create, end, and waiting animals.
 *
 * @module walks-api
 * @category Walks
 */
import apiClient from "@/client";
import {
  waitingWalkResponseSchema,
  walkResponseSchema,
} from "../schemas/walks-schemas";
import type {
  CreateWalkRequestSchema,
  WaitingWalkResponseSchema,
  WalkResponseSchema,
} from "../schemas/walks-schemas";

/** Fetches all walks in the shelter. */
export const getWalks = async (): Promise<WalkResponseSchema[]> => {
  const response = await apiClient.get("/walks/");
  return walkResponseSchema.array().parse(response.data);
};

/** Fetches animals waiting for a walk, ordered by priority. */
export const getWaitingWalks = async (): Promise<
  WaitingWalkResponseSchema[]
> => {
  const response = await apiClient.get("/walks/waiting-animals");
  return waitingWalkResponseSchema.array().parse(response.data);
};

/** Ends an active walk by setting `walk_end` to the current time. */
export const endWalk = async (walk_id: string): Promise<WalkResponseSchema> => {
  const response = await apiClient.patch(`/walks/${walk_id}`, {
    walk_end: new Date().toISOString(),
  });
  return walkResponseSchema.parse(response.data);
};

/** Starts a new walk for the given animal and walker. */
export const createWalk = async (
  data: CreateWalkRequestSchema,
): Promise<WalkResponseSchema> => {
  const response = await apiClient.post("/walks/", {
    ...data,
  });
  return walkResponseSchema.parse(response.data);
};
