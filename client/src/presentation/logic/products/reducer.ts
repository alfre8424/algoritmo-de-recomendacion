import ProductState, {ProductsAction} from "./type";
import AuthState, {ProductsActionType} from "./type"

const initialState: ProductState = {};

export const productsReducer = (state = initialState, action: ProductsAction): AuthState => {
	switch (action.type) {
		case ProductsActionType.load:
			return {
				...state,
				products: [
					...state.products ?? [],
					...action.payload.products ?? [],
				],
			};
		case ProductsActionType.search:
			console.log("searchedProducts", action.payload.searchedProducts);
			return {
				...state,
				query: action.query,
				searchedProducts: [
					...(action.flushSearchedProducts===true ? [] : (state.searchedProducts ?? [])),
					...action.payload.searchedProducts ?? [],
				],
			}
		default:
			return state;
	}
}
