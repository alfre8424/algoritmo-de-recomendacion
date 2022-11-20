import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import type {ReactElement} from "react"

function RegisterComponent(): ReactElement {
	return <>
		<div
			className="flex flex-col bg-gray-200 p-4 h-screen justify-center w-full items-center"
		>
			<h1 className="text-xl font-semibold py-4">
				Registro de cuenta
			</h1>
			<form
				className="flex flex-col p-4 items-center w-full"
			>
				<div className="flex flex-col md:flex-row md:justify-evenly items-center w-full">
					<TextField 
						label="Nombre de usuario"
						variant="filled" 
					/>
					<TextField label="Correo electronico" variant="filled" />
				</div>
				<div className="flex flex-col md:flex-row md:justify-evenly items-center w-full">
					<TextField
						id="outlined-password-input"
						label="Contraseña"
						variant="filled"
						type="password"
						autoComplete="current-password"
					/>
					<TextField
						label="Confirmar contraseña"
						variant="filled"
						type="password"
						autoComplete="current-password"
					/>
				</div>
			</form>
			<Button variant="contained">Registrarse</Button>
		</div>
	</>;
}

export default RegisterComponent;
