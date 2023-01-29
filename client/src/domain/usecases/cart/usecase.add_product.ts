import Either from "core/either";
import AppError from "core/error";
import CartProductEntity from "domain/entities/entity.cart_product";
import ProductEntity from "domain/entities/entity.product";

export interface AddToCartParams {
  product: ProductEntity;
  quantity: number;
}

async function addToCart(params: AddToCartParams): Promise<Either<AppError | null, CartProductEntity>> {
	return Either.cond(true, null, {
      product: params.product,
      quantity: params.quantity
    });
}

export default addToCart;
