const postQueries = {
  pinnedPost:
    "SELECT post.id, title, content, createdAt, nickname, isPinned, thumbnailUrl FROM post LEFT JOIN user ON post.authorID = user.id WHERE post.authorId = ? AND post.isPinned = true ORDER BY createdAt DESC LIMIT 6",
  lastPost:
    "SELECT post.id, title, content, createdAt, nickname, isPinned, thumbnailUrl FROM post LEFT JOIN user ON post.authorID = user.id WHERE post.authorId = ? ORDER BY createdAt DESC LIMIT 6",
  searchPost:
    "SELECT post.id, title, content, createdAt, nickname, isPinned, thumbnailUrl FROM post LEFT JOIN user ON post.authorId = user.id WHERE (title LIKE ? OR content LIKE ?) AND post.authorId = ? ORDER BY createdAt DESC",
  countSearchPost:
    "SELECT COUNT(*) as count FROM post  WHERE (title LIKE ? OR content LIKE ?) AND post.authorId = ?",
  createPost:
    "INSERT INTO post (title, content, categoryId, authorId, isPinned, thumbnailUrl) VALUES (?, ?, ?, ?, ?, ?)",
  deletePost: "DELETE FROM post WHERE id = ?",
  getPostAll:
    "SELECT post.id, title, content, createdAt, nickname, isPinned, thumbnailUrl FROM post LEFT JOIN user ON post.authorId = user.id WHERE post.authorId = ? ORDER BY createdAt DESC",
  getPostCount: "SELECT COUNT(*) AS postCount FROM post WHERE authorId = ?",
  getPostByCategory:
    "SELECT post.id, title, content, createdAt, nickname, isPinned, thumbnailUrl FROM post LEFT JOIN user ON post.authorId = user.id WHERE post.authorId = ? AND post.categoryId = ? ORDER BY createdAt DESC",
  getPostCountByCategory:
    "SELECT COUNT(*) AS postCount FROM post WHERE authorId = ? AND categoryId = ?",
  getPostByPid:
    "SELECT post.id, title, content, createdAt, categoryName, nickname, isPinned, thumbnailUrl FROM post LEFT JOIN user ON post.authorId = user.id LEFT JOIN category ON post.categoryId = category.id WHERE post.id = ?",
  updatePostByPid:
    "UPDATE post SET title = ?, content = ?, categoryId = ?, isPinned = ?, thumbnailUrl = ? WHERE id = ?",
};

export default postQueries;
