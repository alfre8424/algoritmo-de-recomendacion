import mysqlConnection from "../../../../core/mysql_connection";

/**
 * Updates the user session table with the provided token
 */
const addSessionUsecase = async (userId: string, token: string): Promise<void> => {
	const connector = mysqlConnection;

	// put the last active session as inactive for the given userId
	await connector.connection.execute(
		"UPDATE session SET is_active = 0 WHERE user_id = ? AND is_active = 1",
		[userId]
	);

	// insert the new session
	await connector.connection.execute(
		"INSERT INTO session (user_id, token, created_at, is_active) VALUES (?, ?, ?, 1)",
		[userId, token, new Date()]
	);
}

export default addSessionUsecase;
