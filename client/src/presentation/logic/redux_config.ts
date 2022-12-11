import { AnyAction, configureStore, Reducer } from "@reduxjs/toolkit";
import {authReducer} from "./auth/reducer";
import AuthState from "./auth/type";
import {uiReducer} from "./ui/reducer";
import UIState from "./ui/type";

export const store = configureStore({
	reducer: {
		auth: authReducer as Reducer<AuthState, AnyAction>,
		ui: uiReducer as Reducer<UIState, AnyAction>,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
