import {Update} from "@mui/icons-material";
import Button from "@mui/material/Button";
import {AppSlider} from "core/shared_components/component.slider";
import type {ReactElement} from "react"

export function EngineSettingsComponent(): ReactElement {
	return <div
		className="w-[500px] mx-auto bg-white rounded-md shadow-md p-4"
	>
		<h1 className="text-lg my-4 font-semibold text-gray-700">Preferencias del motor de búsqueda</h1>
		<span className="text-md text-gray-500">
			El motor de búsqueda es el encargado de buscar los resultados de las búsquedas que hagas en la aplicación. Puedes cambiar el motor de búsqueda por defecto o cambiar el motor de búsqueda de una búsqueda en concreto.
		</span>
		<br />
		<br />


		<AppSlider
			label="Productos saludables"
			infoText="¿Qué tan importante es para usted que los productos recomendados sean saludables? Esto puede aumentar el precio de las canastas recomendadas."
			valueLabelBuilder={(value: number) => {
				if (value === 0) {
					return "Me es indiferente";
				}
				else if (value < 0 && value > -50) {
					return "No me importa tanto";
				}
				else if (value < -50) {
					return "No me importa que no sea muy saludable"
				}
				else if (value > 0 && value < 50) {
					return "Me importa un poco";
				}
				return "Solo recomendar saludables";
			}}
		/>
		<AppSlider
			label="Balance calidad/precio"
			infoText="¿Hacer énfasis en la calidad o en el precio?"
			valueLabelBuilder={(value: number) => {
				if (value === 0) {
					return "Me es indiferente";
				}
				else if (value < 0 && value > -50) {
					return "Me importa más el precio";
				}
				else if (value < -50) {
					return "Productos lo más baratos posible";
				}
				else if (value > 0 && value < 50) {
					return "Me importa más la calidad";
				}
				return "Productos con la mejor calidad";
			}}
		/>
		<AppSlider
			label="Afinidad por productos populares"
			infoText="Determina qué tan importante es para usted que se le recomiende productos populaes, o si desea que la recomendación incluya productos nuevos o no tan conocidos"
			valueLabelBuilder={(value: number) => {
				if (value === 0) {
					return "Me es indiferente";
				}
				else if (value < 0 && value > -50) {
					return "No estaría mal productos nuevos";
				}
				else if (value < -50) {
					return "Quiero productos nuevos";
				}
				else if (value > 0 && value < 50) {
					return "Me gustan los productos populares";
				}
				return "Es importante que sean populares";
			}}
		/>
		<div className="flex flex-row justify-center my-4 mx-auto">
			<Button
				variant="contained"
				component="label"
				sx={{width: 160}}
			>
				Actualizar
			</Button>
		</div>
	</div>;
}
