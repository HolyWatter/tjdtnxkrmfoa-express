const postQueries = {
  createPost:
    "INSERT INTO post (title, content, categoryId, authorId) VALUES (?, ?, ?, ?)",
  deletePost: "DELETE FROM post WHERE id = ?",
};

export default postQueries;
