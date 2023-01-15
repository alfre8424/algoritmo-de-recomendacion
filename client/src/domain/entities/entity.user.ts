/**
 * Entity to manage the user along with the session token
 */
interface UserEntity {
	id: string;
	name: string;
	email: string;
	enabled: boolean;
	token?: string;
	password?: string;
}

export default UserEntity;
