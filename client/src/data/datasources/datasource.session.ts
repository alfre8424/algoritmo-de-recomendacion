import Either from "core/either";
import AppError from "core/error";
import Globals from "core/globals";
import UserAPI from "data/models/model.user_api";
import UserEntity from "domain/entities/entity.user";

/** 
 * Datasource to comunicate this client with the session API
 */
export default class SessionDatasource {

	/**
	 *
	 */
	async login(email: string, password: string): Promise<Either<AppError, UserEntity>> {

		// if the email or the password is empty then do not call the API
		// and return an error
		if (!email || !password) {
			return Either.left({
				error: "Credenciales no válidas",
				debugError: "Wrong credentials",
				errorCode: "ERR__DATASOURCES__SESSION__LOGIN",
				errorDate: new Date()
			} as AppError);
		}

		// target url to login
		const url = `${Globals.API_URL}/auth/login`;

		// body to send to the API
		const body = {
			email,
			password
		};

		// sending the request 
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body),
		});

		// extracting the body 
		const responseBody = await response.json();

		if (response.status === 400 || response.status === 500) {
			return Either.left({
				error: responseBody.message ?? "Ha ocurrido un error crítico",
				errCode: responseBody.errCode ?? "ERR__DATASOURCES__SESSION__LOGIN",
				errorDate: new Date()
			} as AppError);
		}

		// if the response is ok then return the user
		const user = new UserAPI(responseBody.data);

		return Either.right(user);
	}

	async checkSession(): Promise<Either<AppError, UserEntity>> {
		// reading the user from the local storage 
		const sessionUser = localStorage.getItem("sessionUser");
		// decoding the json 
		const user = JSON.parse(sessionUser ?? "{}") as UserEntity | undefined;

		// target url to login
		const url = `${Globals.API_URL}/auth/check`;

		// sending the request 
		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"authorization": `${user?.token}`
			},
		});

		// extracting the body
		const responseBody = await response.json();

		if (response.status === 400 || response.status === 500) {
			return Either.left({
				error: responseBody.message ?? "Ha ocurrido un error crítico",
				errCode: responseBody.errCode ?? "ERR__DATASOURCES__SESSION__CHECK",
				errorDate: new Date()
			} as AppError);
		}

		if (response.status === 401) {
			return Either.left({
				error: "Sesión expirada",
				errCode: "ERR__DATASOURCES__SESSION__CHECK",
				errorDate: new Date()
			} as AppError);
		}

		// if the response is ok then return the user
		const newUser = new UserAPI(responseBody);

		return Either.right(newUser);
	}

	async register(data: UserEntity): Promise<Either<AppError, boolean>> {
		// target url to login
		const url = `${Globals.API_URL}/auth/signup`;

		console.log("Data to register", JSON.stringify(data));
		// sending the request 
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		// extracting the body 
		const responseBody = await response.json();

		if (response.status === 400 || response.status === 500) {
			return Either.left({
				error: responseBody.message ?? "Ha ocurrido un error crítico",
				errCode: responseBody.errCode ?? "ERR__DATASOURCES__SESSION__LOGIN",
				errorDate: new Date()
			} as AppError);
		}

		return Either.right(true);
	}

	async logout(): Promise<Either<AppError, boolean>> {
		// reading the user from the local storage 
		const sessionUser = localStorage.getItem("sessionUser");
		// decoding the json 
		const user = JSON.parse(sessionUser ?? "{}") as UserEntity | undefined;

		// target url to login
		const url = `${Globals.API_URL}/auth/logout`;

		// sending the request 
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application",
				"authorization": `${user?.token}`
			},
		});

		// extracting the body
		const responseBody = await response.json();

		if (response.status === 400 || response.status === 500) {
			return Either.left({
				error: responseBody.message ?? "Ha ocurrido un error crítico",
				errCode: responseBody.errCode ?? "ERR__DATASOURCES__SESSION__LOGOUT",
				errorDate: new Date()
			} as AppError);
		}

		// updating the state 
		return Either.right(true);

	}
}

