import express from "express";
import addPost from "../repository/postRepository";

const postController = express.Router();

postController.get("/", (req, res) => {
  res.json("hello world");
});

postController.post("/", async (res, req) => {
  const { title, categoryId } = res.body;
  await addPost(title, categoryId);
});

export default postController;
