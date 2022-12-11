import UserEntity from "domain/entities/entity.user";

class UserAPI implements UserEntity {
	id: string;
	name: string;
	email: string;
	enabled: boolean;
	/**
	 * If the token does not exist then the session has been finished
	 */
	token?: string | undefined;

	constructor(data: any) {
		this.id = data.user.id;
		this.name = data.user.name;
		this.email = data.user.email;
		this.enabled = data.user.enabled;
		this.token = data.token;
	}
}

export default UserAPI;
