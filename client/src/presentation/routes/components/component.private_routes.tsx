import AuthController from "presentation/logic/auth/controller";
import {AppDispatch} from "presentation/logic/redux_config";
import {Home} from "presentation/views/home";
import {ReactElement, useEffect} from "react"
import {useDispatch} from "react-redux";
import {Route} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import PrivateRoutes from "../private_routes";
import PublicRoutes from "../public_routes"

interface PrivateRouteProps {
	child: ReactElement;
	path: PrivateRoutes;
}

export function PrivateRoute({
	child,
	path
}: PrivateRouteProps): ReactElement {

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
