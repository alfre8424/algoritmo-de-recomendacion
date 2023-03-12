import express, { Router } from 'express';
import AppError from '../../core/error';
import mysqlConnection from '../../core/mysql_connection';
import UserValidator from '../../core/validators/user';
import UserMySQLModel from '../../data/models/model.user_mysql';
import SessionRepository from '../../data/repositories/session/repository.session';
import checkSessionUsecase from '../../data/repositories/session/usecases/check_session';
import UserEntity from '../../domain/entities/entity.user';
import bcrypt from 'bcrypt';
import validator from "validator";

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
    this.router.get(this.path + '/getSecurityAnswer', (req, res) => this.getSecurityAnswer(req, res));
    this.router.get(this.path + '/validateSecurityAnswer', (req, res) => this.validateSecurityAnswer(req, res));
    this.router.post(this.path + '/resetPassword', (req, res) => this.resetPassword(req, res));
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

  async getSecurityAnswer(req: any, res: any): Promise<void> {
    const { email } = req.query ?? {};

    if (!email) {
      res.status(400).json({
        message: 'Debe proporcionar un email',
        errCode: 'EMAIL_REQUIRED',
      });
      return;
    }

    const mysqlConn = mysqlConnection.connection;

    const [rows] = await mysqlConn.execute(
      'select * from users where email = ?',
      [email]
    );

    if (!rows) {
      res.status(400).json({
        message: 'El email no existe',
        errCode: 'EMAIL_NOT_FOUND',
      });
      return;
    }

    const dboutput: any[] = JSON.parse(JSON.stringify(rows));

    if (dboutput.length === 0) {
      res.status(400).json({
        message: 'El email no existe',
        errCode: 'EMAIL_NOT_FOUND',
      });
      return;
    }

    const session = new UserMySQLModel(dboutput[0]);

    res.json({
      message: 'Respuesta de seguridad recuperada',
      data: session.securityQuestion,
    });
  }

  async validateSecurityAnswer(req: any, res: any): Promise<void> {
    const { email, securityAnswer } = req.query ?? {};

    if (!email || !securityAnswer) {
      res.status(400).json({
        message: 'Debe proporcionar un email y una respuesta de seguridad',
        errCode: 'EMAIL_AND_SECURITY_ANSWER_REQUIRED',
      });
      return;
    }

    const mysqlConn = mysqlConnection.connection;

    const [rows] = await mysqlConn.execute(
      'select * from users where email = ?',
      [email]
    );

    if (!rows) {
      res.status(400).json({
        message: 'El email no existe',
        errCode: 'EMAIL_NOT_FOUND',
      });
      return;
    }

    const dboutput: any[] = JSON.parse(JSON.stringify(rows));

    if (dboutput.length === 0) {
      res.status(400).json({
        message: 'El email no existe',
        errCode: 'EMAIL_NOT_FOUND',
      });
      return;
    }

    const session = new UserMySQLModel(dboutput[0]);

    if (!session.securityAnswer) {
      res.status(400).json({
        message: 'El usuario no tiene una respuesta de seguridad guardada. La cuenta no se puede recuperar.',
        errCode: 'USER_HAS_NO_SECURITY_ANSWER',
      });
      return;
    }

    if (session.securityAnswer?.toLowerCase() !== securityAnswer?.toLowerCase()) {
      res.status(400).json({
        message: 'La respuesta de seguridad no es válida',
        errCode: 'INVALID_SECURITY_ANSWER',
      });
      return;
    }

    res.json({
      message: 'Respuesta de seguridad válida',
    });
  }

  async resetPassword(req: any, res: any): Promise<void> {
    const { email, answer, password } = req.body ?? {};

    if (!email || !answer || !password) {
      res.status(400).json({
        message: 'Debe proporcionar un email, una respuesta de seguridad y una nueva contraseña',
        errCode: 'EMAIL_AND_SECURITY_ANSWER_AND_PASSWORD_REQUIRED',
      });
      return;
    }

    const mysqlConn = mysqlConnection.connection;

    const [rows] = await mysqlConn.execute(
      'select * from users where email = ?',
      [email]
    );

    if (!rows) {
      res.status(400).json({
        message: 'El email no existe',
        errCode: 'EMAIL_NOT_FOUND',
      });

      return;
    }

    const dboutput: any[] = JSON.parse(JSON.stringify(rows));

    if (dboutput.length === 0) {
      res.status(400).json({
        message: 'El email no existe',
        errCode: 'EMAIL_NOT_FOUND',
      });
      return;
    }

    const session = new UserMySQLModel(dboutput[0]);

    if (!session.securityAnswer) {
      res.status(400).json({
        message: 'El usuario no tiene una respuesta de seguridad guardada. La cuenta no se puede recuperar.',
        errCode: 'USER_HAS_NO_SECURITY_ANSWER',
      });
      return;
    }

    if (session.securityAnswer?.toLowerCase() !== answer?.toLowerCase()) {
      res.status(400).json({
        message: 'La respuesta de seguridad no es válida',
        errCode: 'INVALID_SECURITY_ANSWER',
      });
      return;
    }

    if (!validator.isStrongPassword(password ?? '')) {
      res.status(400).json({
        message: 'La contraseña no es segura, debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número',
        errCode: 'INVALID_PASSWORD',
      });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await mysqlConn.execute(
      'update users set password = ? where email = ?',
      [hashedPassword, email]
    );

    res.json({
      message: 'Contraseña actualizada',
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
