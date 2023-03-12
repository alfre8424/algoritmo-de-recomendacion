import CartProductEntity from "domain/entities/entity.cart_product";
import ProductEntity from "domain/entities/entity.product";
import addToCart, { AddToCartParams } from "domain/usecases/cart/usecase.add_product";
import { AppDispatch } from "../redux_config";
import { CartActionType } from "./type";

export default class CartController {
  public addToCart(product: AddToCartParams) {
    return async (dispatch: AppDispatch) => {

      const response = await addToCart(product);

      if (response.isLeft()) {
        console.log("Ya llevame diosito :(");
        return;
      }

      dispatch({
        type: CartActionType.add,
        payload: {
          cartProduct: response.getRight(),
        }
      })
    }
  }

  public clearCart() {
    return async (dispatch: AppDispatch) => {
      dispatch({
        type: CartActionType.clear,
        payload: {}
      });
    }
  }

  public removeFromCart(product: ProductEntity) {
    return async (dispatch: AppDispatch) => {
      dispatch({
        type: CartActionType.remove,
        payload: {
          cartProduct: { product, quantity: 0 }
        }
      });
    }
  }
}
