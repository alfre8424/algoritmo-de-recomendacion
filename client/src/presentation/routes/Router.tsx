import type {ReactElement} from "react"
import {BrowserRouter, Route, Routes} from "react-router-dom";

import {NotFound} from "presentation/views/404";
import {Home} from "presentation/views/home";

import GeneralRoutes from "./general_routes";

/**
 * Punto de inicio de la aplicacion, desde aqui se decide que componente 
 * renderizar en base a la ruta apuntada por el usuario en la barra de 
 * navegacion.
 */
export function AppRouter(): ReactElement {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path={GeneralRoutes.Home} element={<Home />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
