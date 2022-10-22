import SearchAppBar from "core/shared_components/component.searchbar";
import type { ReactElement } from "react"

export function AppSearch(): ReactElement {
	return (
		<div className="flex flex-row w-full items-center justify-center">
			<SearchAppBar 
				label="Buscar producto"
				value=''
				onChange={() => {}}
			/>
		</div>
	);
}
