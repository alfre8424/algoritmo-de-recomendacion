import type {ReactElement} from "react"
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import GeneralRoutes from "presentation/routes/general_routes";

/**
 * Componente a llamar cuando no se encuentra la ruta solicitada.
 */
export function NotFound(): ReactElement {
	return (
		<div className="w-screen h-screen flex text-gray-400 flex-col items-center text-6xl justify-center">
			<SentimentVeryDissatisfiedIcon fontSize="inherit" className="text-6xl font-bold" />
			<h1 className="text-3xl font-bold">OOPS!</h1>
			<p className="text-xl">Error 404: La ruta solicitada no existe</p>
			<div className="margin-auto">
				<Link to={GeneralRoutes.Home}>
					<Button variant="outlined">Volver a inicio</Button>
				</Link>
			</div>
		</div>
	);
}
