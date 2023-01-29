import express, { Router } from 'express';
import AppError from '../../core/error';
import CartRepository from '../../data/repositories/cart/repository.cart';
import SessionRepository from '../../data/repositories/session/repository.session';

export default class CartController {
  public path = '/cart';
  public router: Router;
  public repository: CartRepository;

  constructor() {
    this.repository = new CartRepository();
    this.router = express.Router();

    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(this.path + '/add', (req, res) => this.createCart(req, res));
  }

  async createCart(req: any, res: any): Promise<void> {
    // checking the session
    const token: string | undefined | null = req.headers.authorization;

    const authRepo = new SessionRepository();
    // processing the token
    const user = await authRepo.checkSession(token ?? '');

    console.log("Cart for user", user?.id);

    const { products } : {products: string[]} = req.body;

    if(!products || products.length === 0) {
      return res.status(200).json({
        message: "No hay nada que agregar"
      });
    }

    const response = await this.repository.addCart(
      user?.id ?? null,
      products,
    );

    if (response instanceof AppError) {
      console.error(response.debugMessage);
      res.status(400).json({
        message: response.message,
      });
      return;
    }

    res.status(200).json({
      message: 'Carrito creado correctamente',
      data: products,
    });
  }
}
