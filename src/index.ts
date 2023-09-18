import express from "express";
import "dotenv/config";
import db from "./database";
import postController from "./post/controller/postController";
import bodyParser from "body-parser";
import cors from "cors";
import userService from "./user/service/userService";
import userController from "./user/controller/userController";

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(postController);
app.use(userController);

db.connect((err) => {
  if (err) console.log("database error");
  if (!err) {
    app.listen(8000, () => {
      console.log(`server is running on http://localhost:${port}`);
    });
  }
});
