import bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';

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
}
