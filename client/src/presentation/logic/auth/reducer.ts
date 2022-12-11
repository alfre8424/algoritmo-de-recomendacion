import AuthState, {AuthAction, AuthActionType} from "./type"

const initialState: AuthState = {};

export const authReducer = (state = initialState, action: AuthAction) => {
	switch (action.type) {
		case AuthActionType.login:
			const {user} = action.payload;
			return {
				...state,
				user,
				token: user?.token,
			};
		case AuthActionType.logout:
			// TODO:
			break;
		case AuthActionType.signup:
			// TODO:
			break;
		default:
			return state;
	}
}
