import AuthController from "presentation/logic/auth/controller";
import {AppDispatch} from "presentation/logic/redux_config";
import {ReactElement, useEffect} from "react"
import {useDispatch} from "react-redux";
import {ToastContainer} from "react-toastify";
import GeneralRoutes from "../general_routes";

interface GeneralRouteProps {
	child: ReactElement;
	path: GeneralRoutes;
}

export function GeneralRoute({
	child,
	path
}: GeneralRouteProps): ReactElement {

	const authController = new AuthController();

	const dispatch: AppDispatch = useDispatch();

	// checking the session 
	useEffect(() => {
		dispatch(authController.checkSession());
	}, []);

	// checking if the path is not in the public routes enum 
	// TODO: check if the user is is session & redirect to home
	return <>
		<ToastContainer />
		{child}
	</>
}
