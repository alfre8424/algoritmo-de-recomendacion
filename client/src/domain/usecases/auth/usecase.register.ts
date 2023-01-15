import Either from "core/either";
import AppError from "core/error";
import SessionDatasource from "data/datasources/datasource.session";
import UserForm from "data/models/model.user_form";

const datasource = new SessionDatasource();

export interface RegisterParams {
	email: string;
	password: string;
	name: string;
}

async function RegisterUsecase(params: RegisterParams): Promise<Either<AppError, boolean>> {
	const user = new UserForm(params)
	return await datasource.register(user);
}

export default RegisterUsecase;
