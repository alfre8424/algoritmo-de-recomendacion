export default abstract class UserEntity {
	id: string;
	email: string;
	name: string;
	enabled: boolean;
	createdAt: Date;
	updatedAt: Date;

	constructor({
		id,
		email,
		name,
		enabled,
		createdAt,
		updatedAt,
	}: UserEntity) {
		this.id = id;
		this.email = email;
		this.name = name;
		this.enabled = enabled;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
}
