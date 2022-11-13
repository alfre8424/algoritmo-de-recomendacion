import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import GeneralRoutes from "presentation/routes/general_routes";
import type {ReactElement} from "react"
import {Link} from "react-router-dom";

function LoginComponent(): ReactElement {
	return <>
		<div className="flex flex-col w-[60%] h-screen py-4 px-6 justify-center items-center">
			<h1 className="text-xl font-semibold">
				Inicio de sesión
			</h1>
			<form className="flex flex-col items-center w-full">
				<TextField label="Nombre de usuario" variant="filled" />
				<TextField
					id="outlined-password-input"
					label="Contraseña"
					variant="filled"
					type="password"
					autoComplete="current-password"
				/>
			</form>
			<div className="my-4">
				<Button variant="outlined">
					<Link
						to={GeneralRoutes.Home}
					>
						Iniciar
					</Link>
				</Button>
			</div>
		</div>
	</>;
}

export default LoginComponent
