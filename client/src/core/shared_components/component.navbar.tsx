import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import DrawerComponent from './component.drawer';
import { Link, useNavigate } from 'react-router-dom';
import PrivateRoutes from 'presentation/routes/private_routes';
import GeneralRoutes from 'presentation/routes/general_routes';
import { AddShoppingCartOutlined, ExitToApp, Home, Person } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'presentation/logic/redux_config';
import UserAPI from 'data/models/model.user_api';
import AuthController from 'presentation/logic/auth/controller';
import PublicRoutes from 'presentation/routes/public_routes';
import UserEntity from 'domain/entities/entity.user';
import AppSimpleDialog from './component.dialog';
import { ProductCard } from './component.product_card';
import { useState } from 'react';
import { RecommendComponent } from 'presentation/views/home/components/component.recommend';
import CartController from 'presentation/logic/cart/controller';

interface AppNavbarProps {
  roundedBorders?: boolean;
  showDrawerButton?: boolean;
  showHomeButton?: boolean;
  activeRoute?: PrivateRoutes;
  onActiveRouteChange?: (route: PrivateRoutes) => void;
  title?: string;
}

function AppNavbar({
  activeRoute,
  roundedBorders = true,
  showDrawerButton = false,
  showHomeButton = false,
  onActiveRouteChange,
  title = ""

}: AppNavbarProps): JSX.Element {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const { auth, cart } = useSelector((state: RootState) => state);
  const dispatch: AppDispatch = useDispatch();
  const navigator = useNavigate();
  const { token } = auth;
  const cartController = new CartController();

  // determines if show the alert with all the products on cart or not
  const [showCart, setShowCart] = useState(false);

  const [showPredictions, setShowPredictions] = useState(false);
  // creating the user entity 
  let userEntity: UserEntity | null = auth?.user ? new UserAPI(auth) : null;

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  if (!activeRoute && showDrawerButton) {
    throw new Error("activeRoute is required when showDrawerButton is true");
  }

  const authController = new AuthController();

  const handleLogoutOrRedirect = () => {
    if (token) {
      dispatch(authController.logout());
    }
    else {
      navigator(PublicRoutes.Login);
    }
  }

  return (
    <AppBar position="static"
      style={{
        backgroundColor: "var(--accent-color)",
        minWidth: "200px",
        borderRadius: roundedBorders ? "var(--border-radius) 0 0 var(--border-radius)" : "",
      }}
    >
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
      {
        <AppSimpleDialog
          isOpen={showCart}
          title="Productos en el carrito"
          useCloseButton={false}
          content={
            <div className="flex flex-col items-center py-[3rem]">
              <div className="p-[2rem] flex flex-row flex-wrap gap-[10px]">
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
      <div className="flex flex-row justify-end px-4">
        {
          showDrawerButton &&
          <>
            <div className="flex flex-row w-full justify-start items-center">
              <Button onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon sx={{ color: "white" }} />
              </Button>
              {
                showHomeButton &&
                <Link to={GeneralRoutes.Home}>
                  <img
                    src="/assets/images/Logoclan2.png"
                    alt="logo"
                    className="w-[40px] h-[40px] ml-2"
                  />
                </Link>

              }
              <div id="title" className="px-2">
                <span>{title}</span>
              </div>
            </div>
            <DrawerComponent
              activeRoute={activeRoute!}
              isOpen={openDrawer}
              onActiveRouteChange={onActiveRouteChange!}
              onClose={() => setOpenDrawer(false)}
            />
          </>
        }
        <Toolbar disableGutters>
          <div className="pl-[2rem] min-w-[250px]">
            {userEntity?.name ?? 'Bienvenido/a'}
          </div>
          {
            cart.cartProducts.length > 0 &&
            <button onClick={() => setShowCart(!showCart)}>
              <AddShoppingCartOutlined sx={{ fontSize: '16px' }} />
            </button>
          }
          <div className="w-[10px]"></div>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Mostrar opciones">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <div
                  className="bg-white w-[40px] h-[40px] rounded-full flex flex-row justify-center items-center text-[20px]"
                >
                  {auth.user?.name[0]}
                </div>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px', paddingX: 4 }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <div className="px-6 flex flex-col items-start">
                <Link
                  onClick={handleCloseUserMenu}
                  className="flex flex-row items-center"
                  to={GeneralRoutes.Home}
                >
                  <Home />
                  &nbsp;
                  <Typography textAlign="center">Home</Typography>
                </Link>
                <br />

                {
                  token &&
                  <>
                    <Link
                      onClick={handleCloseUserMenu}
                      to={PrivateRoutes.Profile}
                      className="flex flex-row items-center"
                    >
                      <Person />
                      &nbsp;
                      <Typography textAlign="center">Perfil</Typography>
                    </Link>
                    <br />
                  </>
                }

                <button
                  onClick={handleLogoutOrRedirect}
                  className="flex flex-row items-center"
                >
                  <ExitToApp />
                  &nbsp;
                  <Typography textAlign="center">{token ? "Cerrar" : "Iniciar"} sesión</Typography>
                </button>
              </div>
            </Menu>
          </Box>
        </Toolbar>
      </div>
    </AppBar>
  );
}
export default AppNavbar;
