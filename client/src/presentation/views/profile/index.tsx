import AppNavbar from "core/shared_components/component.navbar";
import PrivateRoutes from "presentation/routes/private_routes";
import {ReactElement, useState} from "react"
import {EngineSettingsComponent} from "./components/component.engine";
import ProfileComponent from "./components/component.profile";

export default function ProfileScreen(): ReactElement {
	const [activeRoute, setActiveRoute] = useState<PrivateRoutes>(PrivateRoutes.Profile);

	return <>
		<div id="navbar">
			<AppNavbar
				showDrawerButton={true}
				roundedBorders={false}
				title="Perfil de usuario"
				showHomeButton={true}
				activeRoute={activeRoute}
				onActiveRouteChange={setActiveRoute}
			/>
			{
				activeRoute === PrivateRoutes.Profile &&
				<ProfileComponent />
			}
			{
				activeRoute === PrivateRoutes.RecommendationEngine &&
				<EngineSettingsComponent />
			}
		</div>
	</>;
}
