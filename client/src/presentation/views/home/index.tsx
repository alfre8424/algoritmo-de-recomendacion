import AppNavbar from "core/shared_components/component.navbar";
import type {ReactElement} from "react"
import {RecommendSettings} from "./components/component.recommend_settings";
import {AppSearch} from "./components/component.search";

export function Home(): ReactElement {
	return (
		<div className="flex flex-col overflow-x-hidden">
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
			<main id="body" className="w-screen">
				<h1 className="margin-auto my-4 text-center text-2xl font-bold">
					Clan del Dragón
				</h1>
				<div
					className="m-2 flex flex-col items-center p-4 lg:flex-row lg:justify-center"
					style={{
						boxSizing: "border-box",
					}}
				>
					<div className="w-full lg:w-[40vw]">
						<RecommendSettings />
					</div>
					<div className="w-full">
						<AppSearch />
					</div>
				</div>
			</main>
		</div>
	);
}
