import { AddShoppingCartOutlined } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import ProductEntity from "domain/entities/entity.product";
import ImageIcon from '@mui/icons-material/Image';
import { ReactElement, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "presentation/logic/redux_config";
import CartController from "presentation/logic/cart/controller";

interface ProductCardProps {
  product: ProductEntity;
  showAddBtn?: boolean;
}

export function ProductCard({
  product,
  showAddBtn = true,
}: ProductCardProps): ReactElement {

  const dispatch: AppDispatch = useDispatch();
  const cartController = new CartController();
  // extracting the products card from the state
  const { cartProducts } = useSelector((state: RootState) => state.cart);
  const [isOnCart, setIsOnCart] = useState(false);

  // checking if the product is already on the cart once
  useEffect(() => {
    if (cartProducts.find((value) => value.product === product)) {
      setIsOnCart(true);
    } else {
      setIsOnCart(false);
    }
  }, [cartProducts, product]);

  // triggers an effect to update the cart on the state
  const addToCart = () => {
    dispatch(cartController.addToCart({ product, quantity: 1 }));
  }

  const removeFromCart = () => {
    dispatch(cartController.removeFromCart(product));
  }

  console.log(product);

  return <div
    className="w-[200px] flex flex-col p-4 m-2 shadow-md rounded-md bg-blue-50"
  >
    <div className="mx-auto">
      <Avatar>
        <ImageIcon />
      </Avatar>
    </div>
    <div className="mx-auto">
      <h1 className="font-bold text-center">
        {product?.name}
      </h1>
    </div>
    <div className="flex flex-col text-sm">
      <span className="text-gray-500">
        Contenido: {product?.unit}
      </span>
      {
        product?.price && <span className="text-gray-500">
          Precio: ${product.price?.toFixed(2)}
        </span>
      }
    </div>
    {
      showAddBtn &&
      <div
        className="flex flex-row justify-center items-center my-2"
        style={{ bottom: 0 }}
      >
        <Button
          sx={{ fontSize: '12px' }}
          variant="outlined"
          onClick={() => {
            if (isOnCart) removeFromCart();
            else addToCart();
          }}
        >
          {!isOnCart ? "Agregar" : "Eliminar"}
          &nbsp;&nbsp;
          {!isOnCart && <AddShoppingCartOutlined sx={{ fontSize: '16px' }} />}
        </Button>
      </div>
    }
  </div>;
}
