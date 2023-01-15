import mysqlConnection from "../../../../core/mysql_connection";
import UserEntity from "../../../../domain/entities/entity.user";
import AppError from "../../../../core/error";
import UserMySQLModel from "../../../models/model.user_mysql";
import AuthUtil from '../../../../core/utils/util.auth';
import validator from "validator";

const updateUsecase = async (user: UserEntity, password: string | null): Promise<AppError | UserEntity> => {

	if (!user.id) {
		return new AppError({
			message: "Debe proporcionar un ID",
			errCode: "UPDATE_USER",
			debugMessage: "ID not found on the request body"
		});
	}
	const mysqlPool = mysqlConnection;

	user.updatedAt = new Date();

	// verifying the user exists
	const userResponse = await mysqlPool.connection.execute(
		'select * from users where id = ?',
		[user.id]
	)

	if (!userResponse) {
		return new AppError({
			message: 'El usuario no existe',
			errCode: 'UPDATE_USER_NOT_FOUND',
			debugMessage: 'User not found',
		});
	}

	const dboutput: any[] = JSON.parse(JSON.stringify(userResponse));
	const dbUser = dboutput[0][0];
	const dbPassword = dbUser?.password;

	// Using the default password if it does not come in the request
	let encryptedPassword: string | null = dbPassword;
	if (password) {
		// validating password 
		const isStringPassword = validator.isStrongPassword(password);

		if (!isStringPassword) {
			return new AppError({
				message: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número',
				errCode: 'UPDATE_USER_PASSWORD',
				debugMessage: 'Password is not strong enough',
			});
		}
		encryptedPassword = await AuthUtil.hashPassword(password!);
	}

	try {
		// inserting the user into the database
		await mysqlPool.connection.execute(
			`update users set name = ?, password = ?, updated_at = ? where id = ?`,
			[
				user.name ?? dbUser.name,
				encryptedPassword,
				user.updatedAt,
				user.id
			]
		);

		return new UserMySQLModel({
			...dbUser,
			user
		});
	} catch (error: any) {
		return new AppError({
			message: error.message,
			debugMessage: error.message,
			errCode: error.code,
		});
	}
}

export default updateUsecase;
