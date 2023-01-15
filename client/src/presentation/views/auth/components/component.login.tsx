import {Close} from "@mui/icons-material";
import {Dialog, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {mergeClasses} from "core/utils/util.classess";
import {LoginParams} from "domain/usecases/auth/usecase.login";
import {RegisterParams} from "domain/usecases/auth/usecase.register";
import AuthController from "presentation/logic/auth/controller";
import {AppDispatch, RootState} from "presentation/logic/redux_config";
import {ReactElement, useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {SyncLoader} from "react-spinners";
import {toast, ToastContainer} from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

function LoginComponent(): ReactElement {
	const authController = new AuthController();

	const [showRegisterDialog, setShowRegisterDialog] = useState(false);
	const {showLoginLoader} = useSelector((state: RootState) => state.ui);

	const [credentials, setCredentials] = useState<LoginParams>({
		email: "",
		password: ""
	});
	const [registerParams, setRegisterParams] = useState<RegisterParams>({
		email: "",
		password: "",
		name: "",
	});

	const [confirmPassword, setConfirmPassword] = useState("");

	const register = () => {
		if (registerParams.password !== confirmPassword) {
			toast.error("Las contraseñas no coinciden");
			return;
		}

		dispatch(authController.register(registerParams, ()=>{
			setShowRegisterDialog(false);
		}));
	}


	const dispatch: AppDispatch = useDispatch();
	const login = () => {
		dispatch(authController.login(credentials));
	}

	return <>
		<ToastContainer />
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
				<TextField
					label="Email"
					variant="filled"
					disabled={showLoginLoader}
					type="email"
					onChange={(e) => setCredentials({
						...credentials,
						email: e.target.value
					})}
				/>
				<br />

				<TextField
					id="outlined-password-input"
					label="Contraseña"
					variant="filled"
					disabled={showLoginLoader}
					type="password"
					onChange={(e) => setCredentials({
						...credentials,
						password: e.target.value
					})}
					autoComplete="current-password"
				/>
			</form>
			{
				showLoginLoader ?
					<SyncLoader /> :
					<div className="flex flex-col my-4">
						<Button
							variant="contained"
							onClick={login}
						>
							Iniciar sesión
						</Button>
						<Button variant="outlined" style={{marginTop: 5}} onClick={() => setShowRegisterDialog(true)}>
							Registrarse
						</Button>
					</div>
			}
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
					value={registerParams.name}
					error={registerParams.name.length < 3}
					onChange={(e) => setRegisterParams({
						...registerParams,
						name: e.target.value
					})}
				/>
				<TextField
					autoFocus
					margin="dense"
					id="email"
					label="Correo electrónico"
					type="email"
					fullWidth
					variant="outlined"
					value={registerParams.email}
					onChange={(e) => setRegisterParams({
						...registerParams,
						email: e.target.value
					})}
				/>
				<TextField
					autoFocus
					margin="dense"
					id="password"
					label="Contraseña"
					type="password"
					fullWidth
					variant="outlined"
					value={registerParams.password}
					onChange={(e) => setRegisterParams({
						...registerParams,
						password: e.target.value
					})}
				/>
				<TextField
					autoFocus
					margin="dense"
					id="confirm-password"
					label="Confirmar contraseña"
					type="password"
					fullWidth
					variant="outlined"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
				<br />

				<div className="flex flex-row justify-center py-4">
					<Button
						variant="contained"
						className="mx-auto"
						onClick={register}
					>
						Registrarse
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	</>;
}

export default LoginComponent
