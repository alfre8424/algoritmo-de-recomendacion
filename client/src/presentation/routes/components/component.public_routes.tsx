import {Home} from "presentation/views/home";
import type {ReactElement} from "react"
import {Route} from "react-router-dom";
import PublicRoutes from "../public_routes"

interface PublicRouteProps {
	child: ReactElement;
	path: PublicRoutes;
}

export function PublicRoute({
	child,
	path
}: PublicRouteProps): ReactElement {

	// checking if the path is not in the public routes enum 
	// TODO: check if the user is is session & redirect to home
	return child;
}
