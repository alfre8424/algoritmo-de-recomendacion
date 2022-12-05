import {v4 as uuidv4} from 'uuid';

import mysqlConnection from "../../../../core/mysql_connection";
import UserEntity from "../../../../domain/entities/entity.user";
import AppError from "../../../../core/error";
import UserMySQLModel from "../../../models/model.user_mysql";
import AuthUtil from '../../../../core/utils/util.auth';

const signupUsecase = async (user: UserEntity, password: string): Promise<AppError | UserEntity> => {

	const mysqlPool = mysqlConnection;

	// validations
	// generating a random ID 
	const id = uuidv4();

	// replacing creation date with current date as well as updated_at
	user.id = id;
	user.createdAt = new Date();
	user.updatedAt = new Date();

	const encryptedPassword = await AuthUtil.hashPassword(password);

	try {
		// inserting the user into the database
		await mysqlPool.connection.execute(
			`INSERT INTO users (id, email, password, name, enabled, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
			[
				user.id,
				user.email,
				encryptedPassword,
				user.name,
				1,
				user.createdAt,
				user.updatedAt
			]
		);

		return new UserMySQLModel(user);
	} catch (error: any) {
		return new AppError({
			message: error.message,
			debugMessage: error.message,
			errCode: error.code,
		});
	}
}

export default signupUsecase;
