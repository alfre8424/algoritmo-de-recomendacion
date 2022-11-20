import AppNavbar from "core/shared_components/component.navbar";
import PrivateRoutes from "presentation/routes/private_routes";
import {ReactElement, useState} from "react"
import {EngineSettingsComponent} from "./components/component.engine";
import ProfileComponent from "./components/component.profile";

export default function ProfileScreen(): ReactElement {
	const [activeRoute, setActiveRoute] = useState<PrivateRoutes>(PrivateRoutes.Profile);

	return <>
		<div 
			id="navbar"
			className="min-h-screen bg-gray-200"
			style={{boxSizing: "border-box"}}
		>
			<AppNavbar
				showDrawerButton={true}
				roundedBorders={false}
				title="Perfil de usuario"
				showHomeButton={true}
				activeRoute={activeRoute}
				onActiveRouteChange={setActiveRoute}
			/>
			<div className="py-6">
			{
				activeRoute === PrivateRoutes.Profile &&
				<ProfileComponent />
			}
			{
				activeRoute === PrivateRoutes.RecommendationEngine &&
				<EngineSettingsComponent />
			}
			</div>
		</div>
	</>;
}
