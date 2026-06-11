/**
 * Walk date formatting and animal image lookup helpers.
 *
 * @module walks-utils
 * @category Walks
 */
type AnimalWithMainImage = {
  id: string;
  main_image: { url: string } | null;
};

/** Builds a map of animal ID → presigned image URL for walk cards. */
export const buildAnimalImageMap = (
  animals: AnimalWithMainImage[] | undefined,
): Map<string, string> => {
  const images = new Map<string, string>();

  animals?.forEach((animal) => {
    if (animal.main_image?.url) {
      images.set(animal.id, animal.main_image.url);
    }
  });

  return images;
};

/** Parses API date strings (ISO or space-separated) into a `Date`. */
export const parseWalkDate = (date: string) => {
  const normalizedDate = date.includes("T") ? date : date.replace(" ", "T");
  const parsedDate = new Date(normalizedDate);

  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
};

/** Formats a walk date for display (`dd.mm.yyyy`, Polish locale). */
export const formatDate = (date: string) => {
  const parsedDate = parseWalkDate(date);

  if (!parsedDate) return "-";

  return parsedDate.toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

/** Formats a walk time for display (`HH:mm`, Polish locale). */
export const formatTime = (date: string) => {
  const parsedDate = parseWalkDate(date);

  if (!parsedDate) return "-";

  return parsedDate.toLocaleTimeString("pl-PL", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/** Returns whether a walk started on the same calendar day as `reference`. */
export const isSameDay = (dateString: string, reference: Date) => {
  const parsed = parseWalkDate(dateString);
  if (!parsed) return false;

  return (
    parsed.getFullYear() === reference.getFullYear() &&
    parsed.getMonth() === reference.getMonth() &&
    parsed.getDate() === reference.getDate()
  );
};
