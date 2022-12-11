import {toast} from "react-toastify";

import loginUsecase, {LoginParams} from "domain/usecases/auth/usecase.login";
import {AppDispatch} from "../redux_config";
import {AuthActionType} from "./type";
import UIController from "../ui/controller";

export default class AuthController {
	public login(params: LoginParams) {
		return async (dispatch: AppDispatch) => {
			const uiController = new UIController();
			const usecase = loginUsecase;
			dispatch(uiController.showLoginLoader(true));
			const result = await usecase(params);

			console.log("Starting session");
			// it means there is an error
			if (result.isLeft()) {
				const error = result.getLeft();
				const {error: errorMsg, debugError} = error;
				console.error(debugError);
				// showing the error to the user 
				toast.error(errorMsg);
				dispatch(uiController.showLoginLoader(false));
				return;
			}

			// it means there is no error
			const sessionUser = result.getRight();
			// triggering state update
			dispatch(uiController.showLoginLoader(false));
			dispatch({type: AuthActionType.login, payload: sessionUser});
		};
	}
}
