import ProductEntity from "domain/entities/entity.product";

export enum ProductsActionType {
	load = "[products] load",
	search = "[products] search",
}

export default interface ProductState {
	products?: ProductEntity[];
	query?: string;
	searchedProducts?: ProductEntity[];
}

export interface ProductsAction {
	type: ProductsActionType;
	query?: string;
	payload: {products?: ProductEntity[], searchedProducts?: ProductEntity[]};
	flushSearchedProducts?: boolean;
}
