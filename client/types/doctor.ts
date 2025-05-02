export interface Doctor {
  _id?: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  location: string;
  languages: string[];
  availability: string;
  consultation_fee: number;
  image_url?: string;
  bio?: string;
  isVerified?: boolean;
}
