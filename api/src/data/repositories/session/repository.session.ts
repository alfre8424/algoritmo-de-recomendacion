import AppError from "../../../core/error";
import mysqlConnection, {MySQLConn} from "../../../core/mysql_connection";
import {LoginCredentials, SuccessLoginResponse} from "../../../core/types/login";
import UserEntity from "../../../domain/entities/entity.user";
import checkSessionUsecase from "./usecases/check_session";
import loginUsecase from "./usecases/login_usecase";
import signoutUsecase from "./usecases/signout_usecase";
import signupUsecase from "./usecases/signup_usecase";
import updateUsecase from "./usecases/update_usecase";

export default class SessionRepository {
	mysqlConnector: MySQLConn;

	constructor() {
		this.mysqlConnector = mysqlConnection;
	}

	async signout(token: string): Promise<void> {
		return await signoutUsecase(token);
	}

	async login(credentials: LoginCredentials): Promise<AppError | SuccessLoginResponse> {
		return await loginUsecase(credentials);
	}

	async signup(user: UserEntity, password: string): Promise<AppError | UserEntity> {
		return await signupUsecase(user, password);
	}

	async update(user: UserEntity, password: string|null): Promise<AppError | UserEntity> {
		return await updateUsecase(user, password);
	}

	async checkSession(token: string): Promise<UserEntity|null> {
		return await checkSessionUsecase(token);
	}

}
