import {RootState} from "presentation/logic/redux_config";
import {Home} from "presentation/views/home";
import type {ReactElement} from "react"
import {useSelector} from "react-redux";
import {Route} from "react-router-dom";
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

	if (user) {
		// redirecting to home
		window.location.href = GeneralRoutes.Home;
		return <></>
	}

	// checking if the path is not in the public routes enum 
	// TODO: check if the user is is session & redirect to home
	return child;
}
