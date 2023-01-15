import {PhotoCamera, Update} from "@mui/icons-material";
import {Autocomplete, Avatar, Button, FormGroup, IconButton, TextField} from "@mui/material";
import {mergeClasses} from "core/utils/util.classess";
import UserEntity from "domain/entities/entity.user";
import AuthController from "presentation/logic/auth/controller";
import {AppDispatch, RootState} from "presentation/logic/redux_config";
import {ReactElement, useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";

interface ProfileProps {

}

export default function ProfileComponent({

}: ProfileProps): ReactElement {

	const auth = useSelector((state: RootState)=> state.auth);
	const dispatch: AppDispatch = useDispatch();
	const controller = new AuthController();

	const [userData, setUserData] = useState<UserEntity>({
		id: auth?.user?.id ?? '',
		name: auth?.user?.name ?? '',
		email: auth?.user?.email ?? '',
		enabled: auth?.user?.enabled ?? false,
		token: auth?.user?.token ?? '',
	});

	useEffect(()=>{
		setUserData({
			id: auth?.user?.id ?? '',
			name: auth?.user?.name ?? '',
			email: auth?.user?.email ?? '',
			enabled: auth?.user?.enabled ?? false,
			token: auth?.user?.token ?? '',
		});
	}, [auth?.user]);

	const [password, setPassword] = useState<string|null>('');
	const [passwordConfirm, setPasswordConfirm] = useState<string|null>('');

	const update = ()=>{
		if(password !== passwordConfirm){
			toast.error('Las contraseñas no coinciden');
			return;
		}
		dispatch(controller.update({
			...userData,
			password,
		}));
	}

	if(!auth?.user) {
		return <>Cargando usuario...</>;
	}

	return <div
		id="profile-form"
		className={mergeClasses(
			"mx-auto",
			"px-4 py-6",
			"rounded-md",
			"shadow-md",
			"bg-white",
			"flex flex-col",
			"items-center justify-center",
			"w-[450px]"
		)}
	>
		<h1 className="text-md font-semibold text-gray-900">
			Datos personales
		</h1>
		<br />

		<FormGroup>
			<div className="w-[400px]"></div>
			<TextField
				id="username"
				label="Nombres y apellidos"
				variant="filled"
				value={userData.name}
				onChange={(e) => setUserData({...userData, name: e.target.value})}
			/>
			<br />
			<TextField
				id="email"
				label="Correo electrónico"
				variant="filled"
				type="email"
				disabled = {true}
				value={userData.email}
			/>
			<br />

			<TextField
				id="password"
				label="Contraseña"
				variant="filled"
				type="password"
				placeholder="********"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<br />

			<TextField
				id="re-password"
				label="Repetir contraseña"
				variant="filled"
				type="password"
				placeholder="********"
				value={passwordConfirm}
				onChange={(e) => setPasswordConfirm(e.target.value)}
			/>
			<br />

			<div className="mx-auto">
				<Button
					variant="contained"
					component="label"
					sx={{width: 160}}
					onClick={update}
				>
					<div className="flex flex-row">
						<Update />
						&nbsp;
						Actualizar
					</div>
				</Button>
			</div>
		</FormGroup>
	</div>;
}
