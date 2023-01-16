import AppError from "../../../core/error";
import mysqlConnection, {MySQLConn} from "../../../core/mysql_connection";
import ProductEntity from "../../../domain/entities/entity.product";
import queryProductsUseCase, {QueryProductParams} from "./usecases/query_products";

export default class ProductRepository {
	mysqlConnector: MySQLConn;

	constructor() {
		this.mysqlConnector = mysqlConnection;
	}

	async queryProducts(params: QueryProductParams): Promise<AppError|ProductEntity[]> {
		return await queryProductsUseCase(params);
	}

}
