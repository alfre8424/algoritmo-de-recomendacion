import Either from "core/either";
import AppError from "core/error";
import Globals from "core/globals";
import ProductEntity from "domain/entities/entity.product";
import {LoadProductParams} from "presentation/logic/products/controller";

/** 
 * Datasource to comunicate this client with the session API
 */
export default class ProductsDatasource {

	/**
	 *
	 */
	async loadAll(params: LoadProductParams): Promise<Either<AppError, ProductEntity[]>> {

		// target url to login
		const url = `${Globals.API_URL}/products?limit=${params.limit}&offset=${params.offset}${params.query ? `&query=${params.query}` : ""}`;

		// sending the request 
		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			},
		});

		// extracting the body 
		const responseBody = await response.json();

		if (response.status === 400 || response.status === 500) {
			return Either.left({
				error: responseBody.message ?? "Ha ocurrido un error crítico",
				errCode: responseBody.errCode ?? "ERR__DATASOURCES__SESSION__LOGIN",
				errorDate: new Date()
			} as AppError);
		}

		return Either.right(responseBody.data);
	}
}

