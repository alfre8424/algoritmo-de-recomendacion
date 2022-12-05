import mysqlConnection from "../../../../core/mysql_connection"

const signoutUsecase = async (token: string): Promise<void> => {
	const mysqlPool = mysqlConnection;
	const query = "update session set is_active = 0 WHERE token = ?";
	await mysqlPool.connection.query(query, [token]);
}

export default signoutUsecase;
