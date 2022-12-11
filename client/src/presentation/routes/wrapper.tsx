import {RootState} from "presentation/logic/redux_config";
import type {ReactElement} from "react"
import {useSelector} from "react-redux";
import PrivateRoutes from "./private_routes";
import PublicRoutes from "./public_routes";

interface WrapperProps {
	route: string;
	child: ReactElement;
}
/**
 * A session wrapper for the React components
 */
export function Wrapper({child, route}: WrapperProps): ReactElement {

	const {user} = useSelector((state: RootState) => state.auth);

	if (user || route === PublicRoutes.Login) {
		return child;
	}

	if(!user) {
		// redirecting to login 
		window.location.href = PublicRoutes.Login;
		return <></>
	}

	return <div>Not logged in</div>;
}
