import UserEntity from "../../domain/entities/entity.user";
import AppError from "../error";
import validator from "validator";

export default abstract class UserValidator {
	static validate(user: UserEntity, password: string): AppError|null {

		// checking required fields 
		if(UserValidator.checkRequiredFields(user).length > 0) {

			const joinedFields = UserValidator.checkRequiredFields(user).join(", ");
			return new AppError({
				message: `Los siguientes campos son requeridos: ${joinedFields}`,
				debugMessage: `Missing required fields: ${joinedFields}`,
				errCode: "MISSING_REQUIRED_FIELDS",
				errorDate: new Date(),
			});
		}

		let error: string|null = null;
		if (user.name?.length < 3) {
			error = "El nombre debe tener al menos 3 caracteres";
		}
		if (!validator.isEmail(user.email ?? '')) {
			error = "El email no es válido";
		}
		if (!validator.isStrongPassword(password ?? '')) {
			error = "La contraseña no es segura. Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un caracter especial";
		}

		if(error) {
			return new AppError({
				message: error,
				errCode: "VALIDATION_ERROR",
				errorDate: new Date(),
			});
		}

		return null;
	}

	private static checkRequiredFields(user: UserEntity): string[] {
		let missingFields: string[] = [];
		if (!user?.name) {
			missingFields.push("name");
		}
		if (!user?.email) {
			missingFields.push("email");
		}

		return missingFields;
	}
}
