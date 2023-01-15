import Either from "core/either";
import AppError from "core/error";
import SessionDatasource from "data/datasources/datasource.session";
import UserForm from "data/models/model.user_form";

const datasource = new SessionDatasource();

export interface UpdateUsecaseParams {
	id: string;
	password: string|null;
	name: string|null;
}

async function UpdateUsecase(params: UpdateUsecaseParams): Promise<Either<AppError, boolean>> {
	const user = new UserForm(params)
	return await datasource.update(user);
}

export default UpdateUsecase;
