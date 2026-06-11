/**
 * React Query hooks for walk data and mutations.
 *
 * @module use-walks
 * @category Walks
 */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createWalk,
  endWalk,
  getWaitingWalks,
  getWalks,
} from "../api/walks-api";
import { walksKeys } from "../api/walks-keys";
import type { CreateWalkRequestSchema } from "../schemas/walks-schemas";
import { buildAnimalImageMap } from "../utils/walks-utils";
import { useAnimalsWithImages } from "@/features/animals/hooks/use-animals";

/** Fetches all walks (without presigned images). */
export const useWalks = () => {
  return useQuery({
    queryKey: walksKeys.all,
    queryFn: getWalks,
  });
};

/** Fetches walks enriched with presigned animal image URLs. */
export const useWalksWithImages = () => {
  const { data: animals } = useAnimalsWithImages();
  const { data: walks, isLoading, isError, error, refetch } = useWalks();
  const images = buildAnimalImageMap(animals);

  const walksWithImages = walks?.map((walk) => ({
    ...walk,
    animal: { ...walk.animal, mainImageUrl: images.get(walk.animal.id) },
  }));

  return {
    data: walksWithImages,
    isLoading,
    isError,
    error,
    refetch,
  };
};

/** Fetches animals waiting for a walk (without images). */
export const useWaitingWalks = () => {
  return useQuery({
    queryKey: walksKeys.waiting,
    queryFn: getWaitingWalks,
  });
};

/** Fetches waiting animals enriched with presigned image URLs. */
export const useWaitingWalksWithImages = () => {
  const { data: animals } = useAnimalsWithImages();
  const {
    data: waitingWalks,
    isLoading,
    isError,
    error,
    refetch,
  } = useWaitingWalks();
  const images = buildAnimalImageMap(animals);

  const waitingWalksWithImages = waitingWalks?.map((waitingWalk) => ({
    ...waitingWalk,
    image_url: images.get(waitingWalk.id) ?? null,
  }));

  return { data: waitingWalksWithImages, isLoading, isError, error, refetch };
};

const invalidateWalkQueries = (
  queryClient: ReturnType<typeof useQueryClient>,
) => {
  queryClient.invalidateQueries({ queryKey: walksKeys.all });
  queryClient.invalidateQueries({ queryKey: walksKeys.waiting });
};

/** Mutation to end an active walk by ID. */
export const useEndWalk = (walk_id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => endWalk(walk_id),
    onSuccess: () => invalidateWalkQueries(queryClient),
  });
};

/** Mutation to start a new walk. Invalidates walk queries on success. */
export const useCreateWalk = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateWalkRequestSchema) => createWalk(data),
    onSuccess: () => invalidateWalkQueries(queryClient),
  });
};
