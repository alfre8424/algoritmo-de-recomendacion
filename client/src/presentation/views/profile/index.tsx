import AppNavbar from "core/shared_components/component.navbar";
import type { ReactElement } from "react"

export default function ProfileScreen(): ReactElement {
	return <>
		<div id="navbar">
			<AppNavbar 
				showDrawerButton={true}
				roundedBorders={false}
				title="Perfil de usuario"
				showHomeButton={true}
			/>
		</div>
	</>;
}
