import {toast} from "react-toastify";

import {AppDispatch} from "../redux_config";
import listProductsUsecase from "domain/usecases/products/usecase.list";
import {ProductsActionType} from "./type";
import ProductEntity from "domain/entities/entity.product";

export interface LoadProductParams {
	limit: number;
	offset: number;
	query?: string;
	flushSearchedProducts?: boolean;
}

export default class ProductsController {
	public load(params: LoadProductParams, callback?: (products: ProductEntity[]) => void) {
		return async (dispatch: AppDispatch) => {
			const usecase = listProductsUsecase;
			const result = await usecase(params);

			// it means there is an error
			if (result.isLeft()) {
				const error = result.getLeft();
				const {error: errorMsg, debugError} = error;
				debugError && console.error(debugError);
				// showing the error to the user 
				toast.error(errorMsg);
				callback && callback([]);
				return;
			}

			// it means there is no error
			const products = result.getRight();

			console.log('Products', products);
			// saving the user in the local storage
			callback && callback(products);
			dispatch({
				type: params.query ? ProductsActionType.search : ProductsActionType.load,
				payload: params.query ? {searchedProducts: products} : {products},
				flushSearchedProducts: params.flushSearchedProducts,
			});
		};
	}
}

