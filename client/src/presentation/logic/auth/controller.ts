import SessionDatasource from "data/datasources/datasource.session";
import loginUsecase, {LoginParams} from "domain/usecases/auth/usecase.login";
import {AppDispatch, RootState} from "../redux_config";

export default class AuthController {
	private datasource: SessionDatasource;

	constructor() {
		this.datasource = new SessionDatasource();
	}

	public login(params: LoginParams) {
		return async (dispatch: AppDispatch, state: RootState) => {
			const usecase = loginUsecase;
			const result = await usecase(params);
		};
	}
}
