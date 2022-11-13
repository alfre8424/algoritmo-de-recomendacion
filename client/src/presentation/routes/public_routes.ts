/**
 * Rutas que solo pueden ser utilizadas por usuarios que no esten en sesion.
 * Cualquier usuario en sesion que intente acceder a esta ruta debera ser 
 * redirigido a la ruta de inicio de sesion o al home.
 */
enum PublicRoutes {
	Login = '/auth',
	RecoverPassword = '/recuperar-contrasena',
}

export default PublicRoutes;
