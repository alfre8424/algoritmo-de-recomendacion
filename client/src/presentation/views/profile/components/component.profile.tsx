import {PhotoCamera, Update} from "@mui/icons-material";
import {Autocomplete, Avatar, Button, FormGroup, IconButton, TextField} from "@mui/material";
import {mergeClasses} from "core/utils/util.classess";
import type {ReactElement} from "react"

interface ProfileProps {

}

export default function ProfileComponent({

}: ProfileProps): ReactElement {
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
			"w-[400px]"
		)}
	>
		<h1 className="text-md font-semibold text-gray-900">
			Datos personales
		</h1>
		<br />

		<FormGroup>
			<div
				className="flex flex-col items-center justify-center"
			>
				<Avatar
					alt="Foto de perfil"
					src="https://i.imgur.com/0X0X0X0.png"
					sx={{width: 100, height: 100}}
					className="m-auto my-1"
				/>
				<Button
					variant="outlined"
					component="label"
					sx={{width: 150}}
				>
					<div className="flex flex-row">
						<PhotoCamera />
						&nbsp;
						Subir
					</div>
					<input hidden accept="image/*" type="file" />
				</Button>
			</div>
			<br />

			<TextField
				id="username"
				label="Nombres y apellidos"
				variant="filled"
			/>
			<br />
			<TextField
				id="email"
				label="Correo electrónico"
				variant="filled"
				type="email"
			/>
			<br />

			<TextField
				id="password"
				label="Contraseña"
				variant="filled"
				type="password"
			/>
			<br />

			<TextField
				error
				helperText="La contraseña debe tener al menos 8 caracteres"
				id="re-password"
				label="Repetir contraseña"
				variant="filled"
				type="password"
			/>
			<br />

			<div className="mx-auto">
				<Button
					variant="contained"
					component="label"
					sx={{width: 160}}
				>
					<div className="flex flex-row">
						<Update />
						&nbsp;
						Actualizar
					</div>
					<input hidden accept="image/*" type="file" />
				</Button>
			</div>
		</FormGroup>
	</div>;
}
