import { SearchOutlined } from "@mui/icons-material";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import AppSimpleDialog from "core/shared_components/component.dialog";
import ListView from "core/shared_components/component.listview";
import SearchAppBar from "core/shared_components/component.searchbar";
import ProductsController from "presentation/logic/products/controller";
import { AppDispatch, RootState } from "presentation/logic/redux_config";
import { ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RecommendComponent } from "./component.recommend";

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

  const { products } = useSelector((state: RootState) => state.products);

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
      </div>
      <ListView />
      <AppSimpleDialog
        isOpen={showAlert}
        title=""
        useCloseButton={false}
        content={
          <RecommendComponent
            onDone={() => setShowAlert(false)}
          />
        }
        onClose={() => setShowAlert(false)}
      />
    </div>
  );
}
