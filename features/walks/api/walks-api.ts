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

export const getWalks = async (): Promise<WalkResponseSchema[]> => {
  const response = await apiClient.get("/walks/");
  return walkResponseSchema.array().parse(response.data);
};

export const getWaitingWalks = async (): Promise<
  WaitingWalkResponseSchema[]
> => {
  const response = await apiClient.get("/walks/waiting-animals");
  return waitingWalkResponseSchema.array().parse(response.data);
};

export const endWalk = async (walk_id: string): Promise<WalkResponseSchema> => {
  const response = await apiClient.patch(`/walks/${walk_id}`, {
    walk_end: new Date().toISOString(),
  });
  return walkResponseSchema.parse(response.data);
};

export const createWalk = async (
  data: CreateWalkRequestSchema,
): Promise<WalkResponseSchema> => {
  const response = await apiClient.post("/walks/", {
    ...data,
  });
  return walkResponseSchema.parse(response.data);
};
