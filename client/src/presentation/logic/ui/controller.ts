import {toast} from "react-toastify";

import loginUsecase, {LoginParams} from "domain/usecases/auth/usecase.login";
import {AppDispatch} from "../redux_config";
import {UIActionType} from "./type";

export default class UIController {
	public showLoginLoader(show: boolean) {
		return async (dispatch: AppDispatch) => {
			dispatch({type: UIActionType.loginLoader, payload: {show}});
		};
	}
}
