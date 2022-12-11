import Either from "core/either";
import AppError from "core/error";
import SessionDatasource from "data/datasources/datasource.session";
import UserEntity from "domain/entities/entity.user";

const datasource = new SessionDatasource();

async function checkSessionUsecase(): Promise<Either<AppError, UserEntity>> {
	return await datasource.checkSession()
}

export default checkSessionUsecase;
