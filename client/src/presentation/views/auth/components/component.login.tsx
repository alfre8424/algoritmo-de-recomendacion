import {Close} from "@mui/icons-material";
import {Dialog, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {mergeClasses} from "core/utils/util.classess";
import GeneralRoutes from "presentation/routes/general_routes";
import {ReactElement, useState} from "react"
import {Link} from "react-router-dom";

function LoginComponent(): ReactElement {
	const [showRegisterDialog, setShowRegisterDialog] = useState(false);
	return <>
		<div className={mergeClasses(
			"flex flex-col",
			"py-12 px-12",
			"justify-center",
			"items-center",
			"bg-white rounded-md",
			"shadow-md",
		)}>
			<h1 className="text-xl font-semibold">
				Inicio de sesión
			</h1>
			<br />

			<form className="flex flex-col items-center w-full">
				<TextField label="Nombre de usuario" variant="filled" />
				<br />

				<TextField
					id="outlined-password-input"
					label="Contraseña"
					variant="filled"
					type="password"
					autoComplete="current-password"
				/>
			</form>
			<div className="flex flex-col my-4">
				<Button variant="contained">
					<Link
						to={GeneralRoutes.Home}
					>
						Iniciar sesión
					</Link>
				</Button>
				<Button variant="outlined" style={{marginTop: 5}} onClick={() => setShowRegisterDialog(true)}>
					Registrarse
				</Button>
			</div>
			<Link
				to="/auth/password-recovery"
				className="text-sm text-blue-500"
			>
				¿Olvidaste tu contraseña?
			</Link>
		</div>
		<Dialog
			open={showRegisterDialog}
			onClose={() => setShowRegisterDialog(false)}
		>
			<DialogTitle
				className="flex flex-row justify-between items-center"
			>
				Registro de cuenta
				<Close 
					className="cursor-pointer"
					onClick={() => setShowRegisterDialog(false)}
				/>
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Crear una cuenta para obtener una recomendación más personalizada y poder
					guardar sus preferencias.
				</DialogContentText>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					label="Nombre completo"
					type="text"
					fullWidth
					variant="outlined"
				/>
				<TextField
					autoFocus
					margin="dense"
					id="email"
					label="Correo electrónico"
					type="email"
					fullWidth
					variant="outlined"
				/>
				<TextField
					autoFocus
					margin="dense"
					id="password"
					label="Contraseña"
					type="password"
					fullWidth
					variant="outlined"
				/>
				<TextField
					autoFocus
					margin="dense"
					id="confirm-password"
					label="Confirmar contraseña"
					type="password"
					fullWidth
					variant="outlined"
				/>
				<br />

				<div className="flex flex-row justify-center py-4">
					<Button
						variant="contained"
						className="mx-auto"
					>
						Registrarse
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	</>;
}

export default LoginComponent
