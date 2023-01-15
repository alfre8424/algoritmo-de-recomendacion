/**
 * Creates a new user entity based on form data
 */
import UserEntity from "domain/entities/entity.user";

class UserForm implements UserEntity {
	name: string;
	email: string;
	password: string;
	id: string;
	enabled: boolean;

	constructor(data: any) {
		this.id = 'ya llevame diosito';
		this.enabled = true;
		this.name = data.name;
		this.email = data.email;
		this.password = data.password;
	}
}

export default UserForm;
