import ProductEntity from "domain/entities/entity.product";

export enum ProductsActionType {
	load = "[products] load",
}

export default interface ProductState {
	products?: ProductEntity[];
}

export interface ProductsAction {
	type: ProductsActionType;
	payload: {products?: ProductEntity[]};
}
