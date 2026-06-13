export const validAnimal = {
  id: "animal-1",
  name: "Kira",
  species: {
    id: "species-1",
    name: "Pies",
  },
  breed: {
    id: "breed-1",
    name: "Mieszaniec",
    species_id: "species-1",
  },
  sex: "female" as const,
  status: "available" as const,
  main_image: {
    id: "image-1",
    url: "https://example.com/kira.jpg",
    annotation: "",
  },
};
