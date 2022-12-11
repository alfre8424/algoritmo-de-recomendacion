import Either from "core/either";
import AppError from "core/error";
import SessionDatasource from "data/datasources/datasource.session";

const datasource = new SessionDatasource();

async function LogoutUsecase(): Promise<Either<AppError, boolean>> {
	return await datasource.logout();
}

export default LogoutUsecase;
