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
		this.router.get(this.path + '/', (req, res) => this.listPaginate(req, res));
	}

	async listPaginate(req: any, res: any): Promise<void> {
		const {limit, offset, q: query} = req.query;
		const response = await this.repository.queryProducts({
			limit: limit ?? 10, 
			offset: offset ?? 0,
			query,
		});

		if (response instanceof AppError) {
			console.error(response.debugMessage);
			res.status(400).json({
				message: response.message,
			});
			return;
		}

		res.status(200).json({
			message: 'Productos cargados',
			offset: offset,
			limit: limit,
			data: response,
		});
	}
}
