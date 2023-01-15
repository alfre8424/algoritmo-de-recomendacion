import UserEntity from "domain/entities/entity.user";

export enum AuthActionType {
	login = "[auth] login",
	logout = "[auth] logout",
	signup = "[auth] signup",
	check = "[auth] check",
	update = "[auth] update",
}

export default interface AuthState {
	/**
	 * This user will also include the token
	 */
	user?: UserEntity;
	token?: string;
}

export interface AuthAction {
	type: AuthActionType;
	payload: {user?: UserEntity};
}
