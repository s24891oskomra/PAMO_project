import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getWaitingWalks, getWalks, patchWalk } from "../api/walks-api";

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

export const usePatchWalk = (walk_id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchWalk,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["walks"] });
    },
  });
};
