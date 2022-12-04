import UserEntity from "../../domain/entities/entity.user";

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface SuccessLoginResponse {
	token: string;
	user: UserEntity;
}
