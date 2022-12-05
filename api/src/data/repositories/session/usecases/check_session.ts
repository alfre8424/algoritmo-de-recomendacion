import mysqlConnection from "../../../../core/mysql_connection";
import UserEntity from "../../../../domain/entities/entity.user";
import UserMySQLModel from "../../../models/model.user_mysql";

const checkSessionUsecase = async (token: string): Promise<UserEntity|null> => {
	const mysqlPool = mysqlConnection;

	const [rows] = await mysqlPool.connection.execute(
		"SELECT * FROM users u join session s on (u.id = s.user_id) WHERE s.token = ? AND s.is_active = 1",
		[token]
	);

	const dboutput: any[] = JSON.parse(JSON.stringify(rows));

	if (dboutput.length === 0) {
		return null;
	}

	const session = new UserMySQLModel(dboutput[0]);
	return session;
}

export default checkSessionUsecase;
