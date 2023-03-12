import type { ReactElement } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "presentation/views/home";

import GeneralRoutes from "./general_routes";
import { PublicRoute } from "./components/component.public_routes";
import { AuthScreen } from "presentation/views/auth";
import PublicRoutes from "./public_routes";
import PrivateRoutes from "./private_routes";
import ProfileScreen from "presentation/views/profile";
import { PrivateRoute } from "./components/component.private_routes";
import { GeneralRoute } from "./components/component.general_routes";
import { NotFound } from "presentation/views/404";
import { PasswordRecovery } from "presentation/views/auth/components/component.password-recovery";

/**
 * Punto de inicio de la aplicacion, desde aqui se decide que componente 
 * renderizar en base a la ruta apuntada por el usuario en la barra de 
 * navegacion.
 */
export function AppRouter(): ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'
          element={
            <GeneralRoute
              path={GeneralRoutes.Home}
              child={<Home />}
            />
          }
        />
        <Route path={GeneralRoutes.Home}
          element={
            <GeneralRoute
              path={GeneralRoutes.Home}
              child={<Home />}
            />
          }
        />
        <Route
          path={PublicRoutes.Login}
          element={
            <PublicRoute
              child={<AuthScreen />}
              path={PublicRoutes.Login}
            />
          }
        />
        <Route
          path={PrivateRoutes.Profile}
          element={
            <PrivateRoute
              path={PrivateRoutes.Profile}
              child={<ProfileScreen />}
            />
          }
        />
        <Route path={PublicRoutes.RecoverPassword}
          element={
            <PublicRoute
              path={PublicRoutes.RecoverPassword}
              child={<PasswordRecovery />}
            />
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

