import "dotenv/config";
import App from "./app";
import UserController from "./user/user.controller";
import AuthController from "./auth/auth.controller";
import CategoryController from "./category/category.controller";

const app = new App([
  new UserController(),
  new AuthController(),
  new CategoryController(),
]);

app.listen();
