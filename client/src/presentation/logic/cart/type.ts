import CartProductEntity from "domain/entities/entity.cart_product";

export enum CartActionType {
  add = "[cart] add", // adds a new product to the cart
  remove = "[cart] remove", // removes a product from the cart
  dismiss = "[cart] dismiss", // removes the whole cart
}

export default interface CartState {
  cartProducts: CartProductEntity[];
}

export interface CartAction {
  type: CartActionType;
  payload: { cartProduct: CartProductEntity }
}
