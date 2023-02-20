import CommerceEntity from "./entity.local";
import ProductEntity from "./entity.product";

/**
 * Entity to represent a recommendation for a determined basket. This will include
* only the beset commerce along with the available products.
 */
export default interface RecommendationEntity {
  basket: ProductEntity[];
  commerce: CommerceEntity;
  basketPrice: number;
  missingProducts: string[]
  score: number;
}
