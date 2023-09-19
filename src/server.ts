import "dotenv/config";
import App from "./app";
import UserController from "./user/user.controller";
import AuthController from "./auth/auth.controller";

const app = new App([new UserController(), new AuthController()]);

app.listen();
