import AppNavbar from "core/shared_components/component.navbar";
import PrivateRoutes from "presentation/routes/private_routes";
import { ReactElement, useState } from "react"

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
				activeRoute === PrivateRoutes.Profile && <span>Perfil de usuario</span>
			}
			{
				activeRoute === PrivateRoutes.RecommendationEngine && <span>Motor de recomendación</span>
			}
		</div>
	</>;
}
