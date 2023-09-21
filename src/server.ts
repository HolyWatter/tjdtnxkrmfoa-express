import "dotenv/config";
import App from "./app";
import UserController from "./user/user.controller";
import AuthController from "./auth/auth.controller";
import CategoryController from "./category/category.controller";
import PostController from "./post/post.controller";

const app = new App([
  new UserController(),
  new AuthController(),
  new CategoryController(),
  new PostController(),
]);

app.listen();
