/**
 * Rutas que solo pueden ser utilizadas por usuarios que esten en sesion.
 */
enum PrivateRoutes {
	Profile = '/perfil',
	RecommendationEngine = '/motor-de-recomendacion',
}

export default PrivateRoutes;
