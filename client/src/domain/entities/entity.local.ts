export default interface CommerceEntity {
  id: string;
  location: string;
  popularity: number;
  quality: number;
  name: string;
  webpage?: string;
  lat?: number;
  lon?: number;
}
