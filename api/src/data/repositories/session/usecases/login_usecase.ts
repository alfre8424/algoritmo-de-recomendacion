import AppError from "../../../../core/error";
import mysqlConnection from "../../../../core/mysql_connection";
import {LoginCredentials, SuccessLoginResponse} from "../../../../core/types/login";
import AuthUtil from "../../../../core/utils/util.auth";
import UserMySQLModel from "../../../models/model.user_mysql";
import addSessionUsecase from "./add_session";

const loginUsecase = async (credentials: LoginCredentials): Promise<AppError | SuccessLoginResponse> => {

	const mysqlConnector = mysqlConnection;
	// searching an user that matches the provided email 
	const [rows, _] = await mysqlConnector.connection.execute(
		"SELECT * FROM users WHERE email = ?",
		[credentials.email]
	);

	// if no user was found, return an error
	if (!rows) {
		return new AppError({
			message: "Credenciales incorrectas",
			debugMessage: "No user was found with the provided email",
			errCode: "LOGIN_INVALID_CREDENTIALS",
		});
	}

	// creating the user entity from the mysql output
	const dboutput: any[] = JSON.parse(JSON.stringify(rows));
	const dbUser = dboutput[0];
	const password = dbUser?.password;

	// comparing the provided password with the one stored in the database
	const match = await AuthUtil.comparePassword(
		credentials.password, password ?? ''
	);

	// if the passwords don't match, return an error
	if (!match) {
		return new AppError({
			message: "Credenciales incorrectas",
			debugMessage: "The provided password doesn't match the one stored in the database",
			errCode: "LOGIN_INVALID_CREDENTIALS",
		});
	}

	// if everything is ok, generate a token 
	const token = AuthUtil.generateToken();
	const user = new UserMySQLModel(dboutput[0]);

	// and add the session to the database
	await addSessionUsecase(user.id!, token);

	// if the user was found, check if the password matches
	return {
		token,
		user,
	};
}

export default loginUsecase;
