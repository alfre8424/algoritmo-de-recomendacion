import {Home} from "presentation/views/home";
import type {ReactElement} from "react"
import {Route} from "react-router-dom";
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

	// checking if the path is not in the public routes enum 
	// TODO: check if the user is is session & redirect to home
	return child;
}
