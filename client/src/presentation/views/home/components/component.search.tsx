import { SearchOutlined } from "@mui/icons-material";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import AppSimpleDialog from "core/shared_components/component.dialog";
import ListView from "core/shared_components/component.listview";
import { ProductCard } from "core/shared_components/component.product_card";
import SearchAppBar from "core/shared_components/component.searchbar";
import ProductsController from "presentation/logic/products/controller";
import { AppDispatch, RootState } from "presentation/logic/redux_config";
import { ReactElement, useState } from "react"
import { useDispatch, useSelector } from "react-redux";

interface IAppSearchBarProps {
	onSearch: () => void;
}

export function AppSearch({
	onSearch,
}: IAppSearchBarProps): ReactElement {
	const dispatch: AppDispatch = useDispatch();
	const productController = new ProductsController();
	const [paginatedData, setPaginatedData] = useState<any>({
		limit: 20,
		page: 0,
	});

	const [search, setSearch] = useState<string>("");
	const [showAlert, setShowAlert] = useState<boolean>(false);
	const [surveyRatings, setSurveyRatings] = useState<number[]>([0, 0, 0]);

	const { products, searchedProducts } = useSelector((state: RootState) => state.products);
	return (
		<div
			className="bg-white flex px-8 shadow-md rounded-md py-8 flex-col h-full w-full items-center justify-start"
		>
			<SearchAppBar
				label="Buscar producto"
				value=''
				placeholder="Ingrese el nombre de un producto"
				onChange={(value) => {
					setSearch(value);
				}}
			/>
			<div className="my-1"></div>
			<div>
				<Button
					variant="contained"
					onClick={() => {
						dispatch(productController.load({
							limit: paginatedData.limit,
							offset: paginatedData.page,
							query: search,
							flushSearchedProducts: true,
						}));

						onSearch();
					}}
				>

					Buscar&nbsp;<SearchOutlined />
				</Button>
			</div>
			<div className="flex flex-col md:flex-row md:justify-between mt-8 md:items-center w-full h-full">
				<InputLabel className="w-full text-center md:text-left">
					Mostrando productos disponibles ({products?.length})
				</InputLabel>
				<Button
					variant="outlined"
					onClick={() => {
						setShowAlert(true);
					}}
				>Predecir</Button>
			</div>
			<ListView />
			<AppSimpleDialog
				isOpen={showAlert}
				title="Resultado de la búsqueda"
				content={
					<div>
						<h1>Prediccion de canasta</h1>
						<br />
						<h2
							className="text-lg font-semibold"
						>
							Encuesta de calidad
						</h2>
						<span>
							Por favor, indiquenos la calidad de los siguientes apartados en el local 'local'
						</span>
						<br /><br />
						<Typography component="legend">¿Qué tan buena fue la atención brindada?</Typography>
						<Rating
							name="survey1"
							value={surveyRatings[0]}
							onChange={(_, newValue) => {
								setSurveyRatings([newValue ?? 0, surveyRatings[1], surveyRatings[2]]);
							}}
						/>
						<br />
						<Typography component="legend">¿Qué tanta variedad de productos hay en el local?</Typography>
						<Rating
							name="suervey2"
							value={surveyRatings[1]}
							onChange={(_, newValue) => {
								setSurveyRatings([surveyRatings[0], newValue ?? 0, surveyRatings[2]]);
							}}
						/>
						<Typography component="legend">¿Qué tan probable es que recomiende el local?</Typography>
						<Rating
							name="suervey2"
							value={surveyRatings[2]}
							onChange={(_, newValue) => {
								setSurveyRatings([surveyRatings[0], surveyRatings[1], newValue ?? 0]);
							}}
						/>
					</div>
				}
				onClose={() => setShowAlert(false)}
			/>
		</div>
	);
}
