import apiClient from "@/client";
import type { WaitingWalk, Walk } from "../types/walks-types";
import {
  waitingWalkResponseSchema,
  walkResponseSchema,
} from "../schemas/walks-schemas";

export const getWalks = async (): Promise<Walk[]> => {
  const response = await apiClient.get("/walks/");
  return walkResponseSchema.parse(response.data);
};

export const getWaitingWalks = async (): Promise<WaitingWalk[]> => {
  const response = await apiClient.get("/walks/waiting-animals");
  return waitingWalkResponseSchema.parse(response.data);
};

export const patchWalk = async (walk_id: string): Promise<Walk> => {
  const response = await apiClient.patch(`/walks/${walk_id}`, {
    walk_end: new Date().toISOString(),
  });
  return response.data;
};
