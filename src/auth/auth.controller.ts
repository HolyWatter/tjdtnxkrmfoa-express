import { Request, Response, Router } from "express";
import Controller from "../interface/controller.interface";
import App from "../app";
import AuthService from "./auth.service";
import { NextFunction } from "connect";
import UserCreateDto from "../user/dto.ts/user.create.dto";
import validationMiddleware from "../../src/middleware/validation.middleware";
import LogInDto from "./dto/login.dto";
import WrongAuthenticationTokenException from "../../src/exceptions/WrongAuthenticationExecption";
import { Connection } from "mysql2";

class AuthController implements Controller {
  public path = "/auth";
  public router = Router();
  public authService: AuthService;
  private db: Connection;

  constructor() {
    const appInstance = App.getInstance([]);
    this.db = appInstance.getDB();

    this.authService = new AuthService(this.db);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(UserCreateDto),
      this.registration
    );
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(LogInDto),
      this.login
    );
    this.router.post(`${this.path}/token`, this.token);
  }

  private registration = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userData: UserCreateDto = req.body;
    try {
      const user = await this.authService.register(userData);
      res.status(200).json({
        message: "회원가입에 성공했습니다.",
        data: user,
      });
    } catch (err) {
      next(err);
    }
  };

  private login = async (req: Request, res: Response, next: NextFunction) => {
    const logInData: LogInDto = req.body;
    try {
      const { refreshToken, accessToken } = await this.authService.login(
        logInData
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: true,
        secure: true,
      });

      res.status(200).json({ accessToken });
    } catch {
      new WrongAuthenticationTokenException();
    }
  };

  private token = async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;

    if (refreshToken) {
      const { accessToken } = await this.authService.refreshToken(refreshToken);
      return res.json({ accessToken });
    } else {
      new WrongAuthenticationTokenException();
    }
  };
}

export default AuthController;
