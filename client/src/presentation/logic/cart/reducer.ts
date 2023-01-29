import CartProductEntity from "domain/entities/entity.cart_product";
import CartState, { CartAction, CartActionType } from "./type";

const initialState: CartState = {
  cartProducts: [],
};

export const cartReducer = (state = initialState, action: CartAction): CartState => {
  switch (action.type) {
    case CartActionType.add:
      const { cartProduct: productToAdd } = action.payload;
      return {
        ...state,
        cartProducts: [
          ...state.cartProducts,
          productToAdd,
        ],
      }
    case CartActionType.remove:
      const { cartProduct: productToRemove } = action.payload;
      let products: CartProductEntity[] = state.cartProducts;

      products = products.filter(pro => pro.product !== productToRemove.product);

      return {
        ...state,
        cartProducts: products,
      }
    case CartActionType.dismiss:
      return {
        ...state,
        cartProducts: [],
      }
    default:
      return state;
  }
}
