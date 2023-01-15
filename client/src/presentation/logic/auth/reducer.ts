import {Reducer} from "react";
import AuthState, {AuthAction, AuthActionType} from "./type"

const initialState: AuthState = {};

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
	switch (action.type) {
		case AuthActionType.login:
			const {user} = action.payload;
			return {
				...state,
				user,
				token: user?.token,
			};
		case AuthActionType.logout:
			return {...state, user: undefined, token: undefined};
		case AuthActionType.signup:
			break;
		default:
			return state;
	}

	return state;
}
