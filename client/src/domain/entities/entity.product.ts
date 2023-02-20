export default interface ProductEntity {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  popularity: number;
  unit: string;
  price?: number;
}
