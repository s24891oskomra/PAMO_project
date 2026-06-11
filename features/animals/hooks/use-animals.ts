/**
 * React Query hooks for animal data and image updates.
 *
 * @module use-animals
 * @category Animals
 */
import {
  getAnimals,
  getAnimalsWithPresignedImages,
  patchAnimalImage,
} from "../api/animals-api";
import { animalsKeys } from "../api/animals-keys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/** Fetches the basic animal list (image keys, not presigned URLs). */
export const useAnimals = () => {
  return useQuery({
    queryKey: animalsKeys.all,
    queryFn: getAnimals,
  });
};

/** Fetches animals with presigned download URLs for main images. */
export const useAnimalsWithImages = () => {
  return useQuery({
    queryKey: animalsKeys.withImages,
    queryFn: getAnimalsWithPresignedImages,
  });
};

/** Mutation to set an animal's main image after S3 upload. */
export const usePatchAnimalImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      animalId,
      objectKey,
    }: {
      animalId: string;
      objectKey: string;
    }) => patchAnimalImage(animalId, objectKey),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: animalsKeys.withImages });
      queryClient.invalidateQueries({ queryKey: animalsKeys.all });
    },
  });
};
