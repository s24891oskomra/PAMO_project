export type AnimalStatus =
  | "intake"
  | "quarantine"
  | "available"
  | "reserved"
  | "adopted"
  | "deceased"
  | "transferred"
  | "lost";

export type AnimalSex = "male" | "female" | "unknown";

export type Species = {
  id: string;
  name: string;
};

export type Breed = {
  id: string;
  name: string;
  species_id: string;
};

export type AnimalImage = {
  id: string;
  url: string;
  annotation: string;
};

export type Animal = {
  id: string;
  name: string;
  species: Species;
  breed: Breed;
  sex: AnimalSex;
  status: AnimalStatus;
  main_image: AnimalImage | null;
};

export type AnimalUploadPresignRequest = {
  file_name: string;
  content_type: string;
  file_size: number;
};

export type AnimalUploadPresignResponse = {
  upload_url: string;
  object_key: string;
  expires_in: number;
};

export type AnimalUploadDownloadRequest = {
  animal_id: string;
  object_key: string;
};

export type AnimalUploadDownloadResponse = {
  animal_id: string;
  object_key: string;
  download_url: string;
};
