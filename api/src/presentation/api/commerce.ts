import express, { Router } from 'express';
import AppError from '../../core/error';
import CommerceRepository from '../../data/repositories/commerce/commercerepository';

export default class CommerceController {
  public path = '/commerce';
  public router: Router;
  public repository: CommerceRepository;

  constructor() {
    this.repository = new CommerceRepository();
    this.router = express.Router();

    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path + '/', (req, res) => this.listPaginate(req, res));
  }

  async listPaginate(_: any, res: any): Promise<void> {
    const response = await this.repository.queryCommerces();

    if (response instanceof AppError) {
      console.error(response.debugMessage);
      res.status(400).json({
        message: response.message,
      });
      return;
    }

    res.status(200).json({
      message: 'Comercios cargados',
      data: response,
    });
  }
}
