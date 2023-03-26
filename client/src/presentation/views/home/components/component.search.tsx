import { AddShoppingCartOutlined, SearchOutlined } from "@mui/icons-material";
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
import CartController from 'presentation/logic/cart/controller';
import { ProductCard } from "core/shared_components/component.product_card";

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
  const [showPredictions, setShowPredictions] = useState(false);
  const { cart } = useSelector((state: RootState) => state);
  const cartController = new CartController();

  const { products } = useSelector((state: RootState) => state.products);

  // determines if show the alert with all the products on cart or not
  const [showCart, setShowCart] = useState(false);

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
        {
          cart.cartProducts.length > 0 &&
          <Button
            onClick={() => setShowCart(!showCart)}
            variant="contained"
          >
            <AddShoppingCartOutlined sx={{ fontSize: '16px' }} />
          </Button>
        }
      </div>
      {
        <AppSimpleDialog
          isOpen={showCart}
          title="Productos en el carrito"
          useCloseButton={false}
          content={
            <div className="flex flex-col items-center py-[3rem]">
              <div className="p-[2rem] flex flex-row justify-center flex-wrap gap-[10px]">
                {cart.cartProducts.map((product, index) => {
                  return <ProductCard
                    key={index}
                    product={product.product}
                  />
                })}
                {cart.cartProducts.length === 0 && "No hay productos"}
              </div>
              <div className="flex flex-row gap-10">
                <Button
                  variant="outlined"
                  sx={{ width: "200px" }}
                  onClick={() => {
                    setShowCart(false);
                    dispatch(cartController.clearCart())
                  }}
                >Vaciar carrito</Button>
                <Button
                  variant="contained"
                  sx={{ width: "200px" }}
                  onClick={() => {
                    setShowCart(false);
                    setShowPredictions(true);
                  }}
                >Sugerir local</Button>
              </div>
            </div>
          }
          onClose={() => setShowCart(false)}
        />
      }
      <AppSimpleDialog
        isOpen={showPredictions}
        title=""
        useCloseButton={false}
        content={
          <RecommendComponent
            onDone={() => setShowPredictions(false)}
          />
        }
        onClose={() => setShowPredictions(false)}
      />
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
