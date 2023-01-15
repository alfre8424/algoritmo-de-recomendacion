import UserEntity from "domain/entities/entity.user";
import AuthState, {AuthAction, AuthActionType} from "./type"

const initialState: AuthState = {};

export const decodeUser = (user: UserEntity) => ({
	id: user.id,
	email: user.email,
	name: user.name,
	pasword: user.password,
	token: user.token,
	enabled: user.enabled,
});

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
	switch (action.type) {
		case AuthActionType.login:
			const {user: usr} = action.payload;
			// if the user is not present then preserve the old state
			if (!usr) return state;
			return {
				...state,
				user: decodeUser(usr),
				token: usr?.token,
			};
		case AuthActionType.logout:
			return {...state, user: undefined, token: undefined};
		case AuthActionType.signup:
			break;
		case AuthActionType.update:
			const {user} = action.payload;
			if (!user) return state;
			return {...state, user: decodeUser(user)};
		default:
			return state;
	}

	return state;
}

