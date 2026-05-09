import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createWalk,
  endWalk,
  getWaitingWalks,
  getWalks,
} from "../api/walks-api";
import type { CreateWalkRequestSchema } from "../schemas/walks-schemas";

export const useWalks = () => {
  return useQuery({
    queryKey: ["walks"],
    queryFn: getWalks,
  });
};

export const useWaitingWalks = () => {
  return useQuery({
    queryKey: ["waiting-walks"],
    queryFn: getWaitingWalks,
  });
};

export const useEndWalk = (walk_id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => endWalk(walk_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["walks"] });
    },
  });
};

export const useCreateWalk = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateWalkRequestSchema) => createWalk(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["walks"] });
    },
  });
};
