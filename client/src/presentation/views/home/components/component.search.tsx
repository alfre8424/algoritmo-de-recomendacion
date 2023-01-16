import {SearchOutlined} from "@mui/icons-material";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import ListView from "core/shared_components/component.listview";
import SearchAppBar from "core/shared_components/component.searchbar";
import {RootState} from "presentation/logic/redux_config";
import type {ReactElement} from "react"
import {useSelector} from "react-redux";

interface IAppSearchBarProps {
	onSearch: () => void;
}

export function AppSearch({
	onSearch,
}: IAppSearchBarProps): ReactElement {
	const {products} = useSelector((state: RootState)=>state.products);
	return (
		<div
			className="bg-white flex px-8 shadow-md rounded-md py-8 flex-col h-full w-full items-center justify-start"
		>
			<SearchAppBar
				label="Buscar producto"
				value=''
				placeholder="Ingrese el nombre de un producto"
				onChange={() => {}}
			/>
			<div className="my-1"></div>
			<div onClick={onSearch}>
				<Button
					variant="contained"
				>

					Buscar&nbsp;<SearchOutlined />
				</Button>
			</div>
			<div className="flex flex-col md:flex-row md:justify-between mt-8 md:items-center w-full h-full">
				<InputLabel className="w-full text-center md:text-left">
					Mostrando productos disponibles ({products?.length ?? 0})
				</InputLabel>
				<Button variant="outlined">Predecir</Button>
			</div>
			<ListView />
		</div>
	);
}
