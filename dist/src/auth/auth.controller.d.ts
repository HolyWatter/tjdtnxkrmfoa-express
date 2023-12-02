import Controller from "../interface/controller.interface";
import AuthService from "./auth.service";
declare class AuthController implements Controller {
    path: string;
    router: import("express-serve-static-core").Router;
    authService: AuthService;
    private db;
    constructor();
    private initializeRoutes;
    private registration;
    private login;
    private logout;
}
export default AuthController;
