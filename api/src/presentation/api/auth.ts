import express from 'express';
import AppError from '../../core/error';
import SessionRepository from '../../data/repositories/repository.session';

export default class AuthController {
	public path = '/auth';
	public router = express.Router();
	private repository = new SessionRepository();

	constructor() {
		this.initializeRoutes();
		this.repository = new SessionRepository();
	}

	public initializeRoutes() {
		this.router.post(this.path + '/login', this.login);
	}

	async login(req: any, res: any): Promise<void> {
		const {email, password} = req.body ?? {};

		if (!email || !password) {
			res.status(400).json({
				message: "Credenciales incorrectas",
				debugMessage: "No email or password was provided",
				errCode: "LOGIN_INVALID_CREDENTIALS",
			});
			return;
		}
		const response = await this.repository.login({email, password});

		if (response instanceof AppError) {
			res.status(400).json(response.getJSON());
			return;
		}

		res.json({
			message: "Login exitoso",
			data: response
		});
	}
}
