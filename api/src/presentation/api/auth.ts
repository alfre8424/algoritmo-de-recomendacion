import express, {Router} from 'express';
import AppError from '../../core/error';
import UserValidator from '../../core/validators/user';
import SessionRepository from '../../data/repositories/session/repository.session';
import UserEntity from '../../domain/entities/entity.user';

export default class AuthController {
	public path = '/auth';
	public router: Router;
	public repository: SessionRepository;

	constructor() {
		this.repository = new SessionRepository();
		this.router = express.Router();

		this.initializeRoutes();
	}

	public initializeRoutes() {
		this.router.post(this.path + '/login', (req, res) => this.login(req, res));
		this.router.post(this.path + '/signup', (req, res) => this.signup(req, res));
		this.router.get(this.path + '/check', (req, res) => this.checkSession(req, res));
		this.router.post(this.path + '/signout', (req, res) => this.signout(req, res));
	}

	async signout(req: any, res: any): Promise<void> {
		const token = req.headers.authorization;

		if (!token) {
			res.status(400).json({
				error: 'Debe proporcionar un token',
				errCode: 'TOKEN_REQUIRED',
			});
			return;
		}

		await this.repository.signout(token);

		res.json({
			message: 'Sesión cerrada exitosamente',
		});
	}

	async checkSession(req: any, res: any): Promise<void> {
		const token = req.headers.authorization;

		// checking the token exists
		if (!token) {
			res.status(400).json({
				message: "Token no encontrado",
				errCode: "CHECK_SESSION"
			});
			return;
		}
		// processing the token
		const user = await this.repository.checkSession(token);

		if (!user) {
			res.status(401).json({
				message: "La sesión no es válida",
				errCode: "INVALID_TOKEN"
			});
			return;
		}

		res.json({
			message: "El usuario está autenticado",
			user: user,
			token: token
		});
	}

	async login(req: any, res: any): Promise<void> {
		const {email, password}: {email: string, password: string} = req.body ?? {};

		if (!email || !password) {
			console.error('Missing email or password');
			res.status(400).json({
				message: "Credenciales incorrectas",
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

	async signup(req: any, res: any): Promise<void> {

		const {password} = req.body ?? {};
		const {name, email} = req.body;

		const user = {name, email} as UserEntity;
		// validating fields
		const validator = UserValidator.validate(user, password);

		if (validator) {
			console.error(validator.debugMessage);
			res.status(400).json({
				message: validator.message,
				errCode: validator.errCode,
			});
			return;
		}

		const response = await this.repository.signup(user, password);

		console.log("Pass");

		if (response instanceof AppError) {
			res.status(400).json(response.getJSON());
			return;
		}

		res.json({
			message: "Usuario creado exitosamente",
			data: response
		});
	}
}
