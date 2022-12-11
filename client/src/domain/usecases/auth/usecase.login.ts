import Either from "core/either";
import AppError from "core/error";
import SessionDatasource from "data/datasources/datasource.session";
import UserEntity from "domain/entities/entity.user";

const datasource = new SessionDatasource();

export interface LoginParams {
	email: string;
	password: string;
}

async function loginUsecase(params: LoginParams): Promise<Either<AppError, UserEntity>> {
	const {email, password} = params;
	return await datasource.login(email, password);
}

export default loginUsecase;
