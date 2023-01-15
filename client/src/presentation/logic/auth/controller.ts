import {toast} from "react-toastify";

import loginUsecase, {LoginParams} from "domain/usecases/auth/usecase.login";
import {AppDispatch, RootState} from "../redux_config";
import {AuthActionType} from "./type";
import UIController from "../ui/controller";
import checkSessionUsecase from "domain/usecases/auth/usecase.check_session";
import RegisterUsecase, {RegisterParams} from "domain/usecases/auth/usecase.register";
import AppError from "core/error";
import UpdateUsecase, {UpdateUsecaseParams} from "domain/usecases/auth/usecase.update";
import UserEntity from "domain/entities/entity.user";
import {decodeUser} from "./reducer";

export default class AuthController {
	public login(params: LoginParams) {
		return async (dispatch: AppDispatch) => {
			const uiController = new UIController();
			const usecase = loginUsecase;
			dispatch(uiController.showLoginLoader(true));
			const result = await usecase(params);

			// it means there is an error
			if (result.isLeft()) {
				const error = result.getLeft();
				const {error: errorMsg, debugError} = error;
				debugError && console.error(debugError);
				// showing the error to the user 
				toast.error(errorMsg);
				dispatch(uiController.showLoginLoader(false));
				return;
			}

			// it means there is no error
			const sessionUser = result.getRight();

			// saving the user in the local storage
			// TODO: implement more security
			localStorage.setItem("sessionUser", JSON.stringify(sessionUser));
			// triggering state update
			dispatch(uiController.showLoginLoader(false));
			dispatch({
				type: AuthActionType.login,
				payload: {
					user: decodeUser(sessionUser),
				},
			});
		};
	}

	public checkSession() {
		return async (dispatch: AppDispatch) => {
			const uiController = new UIController();
			dispatch(uiController.showLoginLoader(true));
			const usecase = checkSessionUsecase;
			const result = await usecase();
			dispatch(uiController.showLoginLoader(false));

			// it means there is an error
			if (result.isLeft()) {
				// deleting the old session user if exists 
				localStorage.removeItem("sessionUser");
				return;
			}

			// it means there is no error
			const sessionUser = result.getRight();

			// saving the user in the local storage
			localStorage.setItem("sessionUser", JSON.stringify(sessionUser));

			// triggering state update
			dispatch({
				type: AuthActionType.login, payload: {
					user: sessionUser
				},
			});
		}
	}

	public logout() {
		return async (dispatch: AppDispatch) => {
			localStorage.removeItem("sessionUser");
			toast.success("Sesión cerrada correctamente");
			dispatch({
				type: AuthActionType.logout,
			});
		};
	}

	public register(params: RegisterParams, callback?: () => void) {
		return async () => {
			const response = await RegisterUsecase(params);
			response.fold(
				(l: AppError) => {
					console.error(l);
					toast.error(l.error);
				},
				(r) => {
					if (r) {
						toast.success("Usuario registrado, ya puede iniciar sesión");
						callback && callback();
					}
				},
			);
		}
	}

	public update(params: UpdateUsecaseParams) {
		return async (dispatch: AppDispatch, state: any) => {
			const response = await UpdateUsecase(params);
			const user: UserEntity = state().auth.user;

			response.fold(
				(l: AppError) => {
					console.error(l);
					toast.error(l.error);
				},
				(r) => {
					if (r) {
						toast.success("Usuario actualizado correctamente");
						dispatch({
							type: AuthActionType.update,
							payload: {
								user: {
									...user,
									...params,
								}
							}
						});
					}
				}
			);
		}
	}
}

