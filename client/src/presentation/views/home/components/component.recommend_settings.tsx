import {AppSlider} from "core/shared_components/component.slider";
import type {ReactElement} from "react";

export function RecommendSettings(): ReactElement {
	return (
		<div id="settings" className="bg-white w-full flex flex-col justify-start shadow-md rounded-md p-8">
			<AppSlider
				label="Productos saludables"
				infoText="¿Qué tan importante es para usted que los productos recomendados sean saludables?"
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
		</div>
	);
}
