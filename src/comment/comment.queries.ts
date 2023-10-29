const commentQueries = {
  writeComment:
    "INSERT INTO comments (postId, username, password, comment) VALUES (?, ?, ?, ?)",

  getOneCommentWithPassword: "SELECT * FROM comments WHERE id = ?",

  deleteComment: "DELETE FROM comments WHERE id = ?",
};

export default commentQueries;
