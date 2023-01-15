import AppSimpleDialog from "core/shared_components/component.dialog";
import React from "react";
import type {ReactElement} from "react"
import AppNavbar from "core/shared_components/component.navbar";
import {RecommendSettings} from "./components/component.recommend_settings";
import {AppSearch} from "./components/component.search";
import {useSelector} from "react-redux";
import {RootState} from "presentation/logic/redux_config";

export function Home(): ReactElement {

	const [showAlert, setShowAlert] = React.useState(false);
	const {token} = useSelector((state: RootState) => state.auth);


	return (
		<div className="flex flex-col overflow-x-hidden h-min-screen bg-gray-200">
			<div
				className="flex flex-col items-end h-[60vh]"
				style={{
					backgroundImage: "url('/assets/images/carrusel.webp')",
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				<div id="nav" className="max-w-[90%] r-0 my-2">
					<AppNavbar />
				</div>
			</div>
			<div id="body" className="w-screen">
				<h1 className="margin-auto my-4 text-center text-2xl font-bold">
					Clan del Dragón
				</h1>
				<div
					className="m-2 flex flex-col items-center p-4 lg:flex-row lg:justify-between lg:items-stretch"
				>
					<div className="w-full lg:w-[40vw] h-full">
						<RecommendSettings />
					</div>
					<div className="lg:w-[1rem]"></div>
					<div className="w-full h-full">
						<AppSearch 
							onSearch={() => setShowAlert(true)}
						/>
					</div>
				</div>
			</div>
			<AppSimpleDialog 
				isOpen={showAlert}
				title="Funcionalidad no disponible"
				content={<p>Esta funcionalidad aún no está disponible.</p>}
				onClose={() => setShowAlert(false)}
			/>
		</div>
	);
}
