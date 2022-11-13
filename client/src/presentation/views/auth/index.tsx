import type {ReactElement} from "react"
import LoginComponent from "./components/component.login";
import RegisterComponent from "./components/component.register";

export function AuthScreen(): ReactElement {
	return <>
		<div className="flex flex-col md:flex-row justify-center items-center">
			<RegisterComponent />
			<LoginComponent />
		</div>
	</>;
}
