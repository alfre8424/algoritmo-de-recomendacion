import {mergeClasses} from "core/utils/util.classess";
import type {ReactElement} from "react"
import LoginComponent from "./components/component.login";
import RegisterComponent from "./components/component.register";

export function AuthScreen(): ReactElement {
	return <>
		<div
			className={mergeClasses(
				"flex flex-col",
				"justify-center",
				"items-center",
				"h-screen",
				"bg-gray-200",
			)}
		>
			<LoginComponent />
		</div>
	</>;
}
