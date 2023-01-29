import ProductEntity from "./entity.product";

export default interface CartProductEntity {
  product: ProductEntity;
  quantity: number;
}
