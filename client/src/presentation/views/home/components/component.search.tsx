import { SearchOutlined } from "@mui/icons-material";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import AppSimpleDialog from "core/shared_components/component.dialog";
import ListView from "core/shared_components/component.listview";
import { ProductCard } from "core/shared_components/component.product_card";
import SearchAppBar from "core/shared_components/component.searchbar";
import { mergeClasses } from "core/utils/util.classess";
import RecommenderDatasource from "data/datasources/datasource.recommender";
import ProductEntity from "domain/entities/entity.product";
import RecommendationEntity from "domain/entities/entity.recommendation";
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
  const [paginatedData] = useState<any>({
    limit: 20,
    page: 0,
  });

  const [search, setSearch] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [surveyRatings, setSurveyRatings] = useState<number[]>([0, 0, 0]);

  const { products } = useSelector((state: RootState) => state.products);
  const { cartProducts } = useSelector((state: RootState) => state.cart);

  const parsedBasketProducts = cartProducts.map((product) => {
    return product.product.id;
  });

  // loading to show the process of prediction
  const [preLoading, setPreLoading] = useState<boolean>(false);
  const [basketResponse, setBasketResponse] = useState<RecommendationEntity | null>(null);

  const predict = async () => {
    setShowAlert(true);
    setPreLoading(true);
    const recommendationDS = new RecommenderDatasource();
    const response = await recommendationDS.recommend(parsedBasketProducts);

    if (response.isRight()) {
      setBasketResponse(response.getRight());
    }
    setPreLoading(false);
  }

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
            predict();
          }}
        >Predecir</Button>
      </div>
      <ListView />
      <AppSimpleDialog
        isOpen={showAlert}
        title=""
        content={
          (preLoading) ? (
            <span>Cargando...</span>
          ) :
            <div>
              <h1 className="font-bold text-center text-xl">¡Te recomendamos {basketResponse?.commerce.name}!</h1>
              <br />

              <div
                className={
                  mergeClasses(
                    "flex flex-row flex-wrap gap-2 justify-center"
                  )
                }
              >
                {
                  basketResponse?.basket?.map((product: ProductEntity, index: number) => {
                    return <ProductCard key={index} product={product} />;
                  })
                }
              </div>
              <br />
              <span className="text-gray-500">
                ¡En {basketResponse?.commerce.name} puedes encontrar
                {
                  basketResponse?.basket.length !== cartProducts.length ?
                    `${basketResponse?.basket.length} de los ${cartProducts.length} productos de tu canasta!`
                    : "todos los productos de tu canasta! "
                }
                Por un precio de solo ${basketResponse?.basketPrice.toFixed(2).replace('.', ',')}.
                {
                  basketResponse?.commerce.webpage && `Puedes visitar su página web en ${basketResponse?.commerce.webpage}.`
                }
              </span>

              <br />
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
