import AuthController from "presentation/logic/auth/controller";
import {AppDispatch, RootState} from "presentation/logic/redux_config";
import {ReactElement, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import GeneralRoutes from "../general_routes";
import PublicRoutes from "../public_routes"

interface PublicRouteProps {
	child: ReactElement;
	path: PublicRoutes;
}

export function PublicRoute({
	child,
	path
}: PublicRouteProps): ReactElement {

	const {user} = useSelector((state: RootState) => state.auth);
	const navigator = useNavigate();

	const authController = new AuthController();

	const dispatch: AppDispatch = useDispatch();

	// checking the session 
	useEffect(() => {
		dispatch(authController.checkSession());
	}, []);

	if (user) {
		// redirecting to home using React-router-DOM
		navigator(GeneralRoutes.Home);
	}

	// checking if the path is not in the public routes enum 
	// TODO: check if the user is is session & redirect to home
	return <>
		<ToastContainer />
		{child}
	</>
}
