/**
 * Animal management API — list, presigned URLs, and image updates.
 *
 * @module animals-api
 * @category Animals
 */
import apiClient from "@/client";
import { animalSchema } from "../schemas/animals-schemas";
import type {
  Animal,
  AnimalUploadDownloadRequest,
  AnimalUploadDownloadResponse,
  AnimalUploadPresignRequest,
  AnimalUploadPresignResponse,
} from "../types/animals-types";

/** Fetches the basic animal list for the current shelter. */
export const getAnimals = async (): Promise<Animal[]> => {
  const response = await apiClient.get("/animals/basic");
  return animalSchema.array().parse(response.data);
};

/** Fetches animals and replaces image keys with presigned download URLs. */
export const getAnimalsWithPresignedImages = async (): Promise<Animal[]> => {
  const animals = await getAnimals();

  const requests = animals
    .filter((animal) => animal.main_image !== null)
    .map((animal) => ({
      animal_id: animal.id,
      object_key: animal.main_image?.url ?? "",
    }));

  if (requests.length === 0) return animals;

  const presigned = await postAnimalDownloadPresignUrl(requests);
  const urlById = new Map(presigned.map((p) => [p.animal_id, p.download_url]));

  return animals.map((animal) => {
    const downloadUrl = urlById.get(animal.id);
    if (!animal.main_image || downloadUrl == null) return animal;
    return {
      ...animal,
      main_image: { ...animal.main_image, url: downloadUrl },
    };
  });
};

/** Requests presigned S3 download URLs for animal images. */
export const postAnimalDownloadPresignUrl = async (
  data: AnimalUploadDownloadRequest[],
): Promise<AnimalUploadDownloadResponse[]> => {
  const response = await apiClient.post<AnimalUploadDownloadResponse[]>(
    "/animals/downloads/presign",
    data,
  );
  return response.data;
};

export const postAnimalUploadPresignUrl = async (
  data: AnimalUploadPresignRequest,
): Promise<AnimalUploadPresignResponse> => {
  const response = await apiClient.post<AnimalUploadPresignResponse>(
    "/animals/uploads/presign",
    data,
  );
  return response.data;
};

/** Requests a presigned S3 upload URL for a new animal photo. */
export const postPresignedUploadUrl = async (
  data: AnimalUploadPresignRequest,
): Promise<AnimalUploadPresignResponse> => {
  const response = await apiClient.post<AnimalUploadPresignResponse>(
    "/animals/uploads/presign",
    data,
  );
  return response.data;
};

export const putAnimalImage = (presignedUploadUrl: string, imageFile: File) =>
  fetch(presignedUploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": imageFile.type,
    },
    body: imageFile,
  });

/** Associates an uploaded S3 object key with an animal's main image. */
export const patchAnimalImage = (animalId: string, objectKey: string) =>
  apiClient.patch(`/animals/${animalId}/main-image`, {
    object_key: objectKey,
  });
