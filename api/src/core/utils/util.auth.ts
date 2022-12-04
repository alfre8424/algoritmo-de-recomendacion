import bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';
import mysqlConnection from '../mysql_connection';

export default abstract class AuthUtil {
	static async hashPassword(password: string): Promise<string> {
		const salt = await bcrypt.genSalt(10);
		return await bcrypt.hash(password, salt);
	}

	static async comparePassword(
		password: string,
		hashedPassword: string
	): Promise<boolean> {
		return await bcrypt.compare(password, hashedPassword);
	}

	/**
	 * Generates a 36 character long UUID
	 */
	static generateToken(): string {
		return uuidv4();
	}

	/**
	 * Updates the user session table with the provided token
	 */
	static async addSession(userId: string, token: string): Promise<void> {
		const connector = mysqlConnection;

		// put the last active session as inactive for the given userId
		await connector.connection.execute(
			"UPDATE user_sessions SET is_active = 0 WHERE user_id = ? AND is_active = 1",
			[userId]
		);

		// insert the new session
		await connector.connection.execute(
			"INSERT INTO session (user_id, token, created_at) VALUES (?, ?, ?, 1)",
			[userId, token, new Date()]
		);
	}
}
