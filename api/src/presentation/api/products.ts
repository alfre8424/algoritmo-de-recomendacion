import express, {Router} from 'express';
import AppError from '../../core/error';
import ProductRepository from '../../data/repositories/session/repository.products';

export default class ProductController {
	public path = '/products';
	public router: Router;
	public repository: ProductRepository;

	constructor() {
		this.repository = new ProductRepository();
		this.router = express.Router();

		this.initializeRoutes();
	}

	public initializeRoutes() {
		this.router.get(this.path + '/', (_, res) => this.listPaginate(res));
	}

	async listPaginate(res: any): Promise<void> {
		const response = await this.repository.queryProducts();
		if (response instanceof AppError) {
			console.error(response.debugMessage);
			res.status(400).json({
				message: response.message,
			});
			return;
		}

		res.status(200).json({
			message: 'Productos cargados',
			data: response,
		});
	}
}
