import { AnyAction, configureStore, Reducer } from "@reduxjs/toolkit";
import { authReducer } from "./auth/reducer";
import AuthState from "./auth/type";
import { cartReducer } from "./cart/reducer";
import CartState from "./cart/type";
import { productsReducer } from "./products/reducer";
import ProductState from "./products/type";
import { uiReducer } from "./ui/reducer";
import UIState from "./ui/type";

export const store = configureStore({
  reducer: {
    auth: authReducer as Reducer<AuthState, AnyAction>,
    ui: uiReducer as Reducer<UIState, AnyAction>,
    products: productsReducer as Reducer<ProductState, AnyAction>,
    cart: cartReducer as Reducer<CartState, AnyAction>,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
