import AppError from "../../../../core/error";
import mysqlConnection from "../../../../core/mysql_connection";
import ProductEntity from "../../../../domain/entities/entity.product";

// Control for paination
let page: number = 1;
let limit: number = 10;

const queryProductsUseCase = async (): Promise<AppError|ProductEntity[]> => {
	const mysqlPool = mysqlConnection;

	const [rows] = await mysqlPool.connection.execute(
		"SELECT * FROM product LIMIT 10",
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
