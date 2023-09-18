import db from "../../database";

const addPost = async (title: string, categoryId: number) => {
  try {
    return db.execute("INSERT INTO posts (title, categoryId) VALUES (?, ?)", [
      title,
      categoryId,
    ]);
  } catch {}
};

export default addPost;
