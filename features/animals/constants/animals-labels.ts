import type { ComponentProps } from "react";
import { Ionicons } from "@expo/vector-icons";
import type { AnimalSex, AnimalStatus } from "../types/animals-types";

type IoniconName = NonNullable<ComponentProps<typeof Ionicons>["name"]>;

export const STATUS_LABELS: Record<AnimalStatus, string> = {
  intake: "Przyjęcie",
  quarantine: "Kwarantanna",
  available: "Do adopcji",
  reserved: "Zarezerwowany",
  adopted: "Adoptowany",
  deceased: "Zmarły",
  transferred: "Przekazany",
  lost: "Zaginiony",
};

export const SEX_LABELS: Record<AnimalSex, string> = {
  male: "Samiec",
  female: "Samica",
  unknown: "Płeć nieznana",
};

export const SEX_ICONS: Record<AnimalSex, IoniconName> = {
  male: "male",
  female: "female",
  unknown: "help-circle-outline",
};
