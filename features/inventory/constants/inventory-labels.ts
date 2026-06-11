export const STATUS_LABELS: Record<string, string> = {
  available: "Dostępny",
  low_stock: "Niski stan",
  out_of_stock: "Brak na stanie",
  discontinued: "Wycofany",
};

export const formatWeightGrams = (grams: string): string => {
  const value = parseFloat(grams);
  if (Number.isNaN(value)) return grams;

  const abs = Math.abs(value);
  if (abs >= 1000) {
    return `${(value / 1000).toFixed(2)} kg`;
  }
  return `${value.toFixed(0)} g`;
};
