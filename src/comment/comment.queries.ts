const commentQueries = {
  writeComment:
    "INSERT INTO comments (postId, username, password, comment) VALUES (?, ?, ?, ?)",

  getCommentsByPid:
    "SELECT id, username, comment, createdAt FROM comments WHERE postId = ?",

  getOneCommentWithPassword: "SELECT * FROM comments WHERE id = ?",

  deleteComment: "DELETE FROM comments WHERE id = ?",

  getPostContent: "SELECT content FROM post WHERE id = ?",
};

export default commentQueries;
