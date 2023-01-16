import Either from "core/either";
import AppError from "core/error";
import ProductsDatasource from "data/datasources/datasource.product";
import ProductEntity from "domain/entities/entity.product";
import {LoadProductParams} from "presentation/logic/products/controller";

const datasource = new ProductsDatasource();

async function listProductsUsecase(params: LoadProductParams): Promise<Either<AppError, ProductEntity[]>> {
	return await datasource.loadAll(params);
}

export default listProductsUsecase;
