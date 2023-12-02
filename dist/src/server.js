"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = require("./app");
const auth_controller_1 = require("./auth/auth.controller");
const user_controller_1 = require("./user/user.controller");
const category_controller_1 = require("./category/category.controller");
const post_controller_1 = require("./post/post.controller");
const blog_controller_1 = require("./blog/blog.controller");
const media_controller_1 = require("./media/media.controller");
const comment_controller_1 = require("./comment/comment.controller");
const app = new app_1.default([
    new user_controller_1.default(),
    new auth_controller_1.default(),
    new category_controller_1.default(),
    new post_controller_1.default(),
    new blog_controller_1.default(),
    new media_controller_1.default(),
    new comment_controller_1.CommentsController(),
]);
app.listen();
//# sourceMappingURL=server.js.map