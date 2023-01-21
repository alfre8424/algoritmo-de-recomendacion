import AppError from "../../../../core/error";
import mysqlConnection from "../../../../core/mysql_connection";
import ProductEntity from "../../../../domain/entities/entity.product";

// Control for paination
export interface QueryProductParams {
	limit: number;
	offset: number;
	query?: string;
}

const queryProductsUseCase = async (params: QueryProductParams): Promise<AppError | ProductEntity[]> => {
	const mysqlPool = mysqlConnection;

	console.log(params);
	const query =
		`SELECT * FROM product ${(params.query && params.query.length > 0) ? `where lower(name) like "%${params.query.toLowerCase()}%"` : ""} order by name ASC LIMIT ${params.limit} OFFSET ${params.offset}`;

	console.log("Query", query);
	const [rows] = await mysqlPool.connection.execute(
		query,
	);

	const dboutput: any[] = JSON.parse(JSON.stringify(rows));

	if (dboutput.length === 0) {
		return [];
	}

	let products: ProductEntity[] = [];

	for (let i = 0; i < dboutput.length; i++) {
		// parsing the data from the database
		products.push(dboutput[i]);
	}

	return products;
}

export default queryProductsUseCase;
