import express, { Router } from 'express';
import AppError from '../../core/error';
import UserValidator from '../../core/validators/user';
import SessionRepository from '../../data/repositories/session/repository.session';
import checkSessionUsecase from '../../data/repositories/session/usecases/check_session';
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
    this.router.put(this.path + '/update', (req, res) => this.update(req, res));
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

    console.log("session checked", user);
    res.json({
      message: "El usuario está autenticado",
      user: user,
      token: token
    });
  }

  async login(req: any, res: any): Promise<void> {
    const { email, password }: { email: string, password: string } = req.body ?? {};

    if (!email || !password) {
      console.error('Missing email or password');
      res.status(400).json({
        message: "Credenciales incorrectas",
        errCode: "LOGIN_INVALID_CREDENTIALS",
      });
      return;
    }
    const response = await this.repository.login({ email, password });

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

    const { password } = req.body ?? {};
    const { name, email } = req.body;

    const user = { name, email } as UserEntity;
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

    if (response instanceof AppError) {
      res.status(400).json(response.getJSON());
      return;
    }

    res.json({
      message: "Usuario creado exitosamente",
      data: response
    });
  }

  async update(req: any, res: any): Promise<void> {

    const token = req.headers.authorization;

    // checking the token exists
    if (!token) {
      res.status(400).json({
        message: "Token no encontrado",
        errCode: "CHECK_SESSION"
      });
      return;
    }

    const validSession = await checkSessionUsecase(token);

    if (!validSession) {
      res.status(400).json({
        message: "Token no válido",
        errCode: "INVALID_TOKEN"
      });
      return;
    }

    const { password, name, securityQuestion, securityAnswer, id } = req.body ?? {};

    const user = { name, id, securityQuestion, securityAnswer } as UserEntity;

    console.log(user)

    if (user.name?.length < 3) {
      res.status(400).json({
        message: 'El nombre debe tener al menos 3 caracteres',
        errCode: 'UPDATE_INVALID_NAME',
      });
      return;
    }

    const response = await this.repository.update(user, password);

    if (response instanceof AppError) {
      res.status(400).json({
        message: (response as AppError).message,
      });
      return;
    }

    res.json({
      message: "Usuario actualizado exitosamente",
      data: response
    });
  }
}
