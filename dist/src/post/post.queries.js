"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postQueries = {
    searchPost: "SELECT post.id, title, content, createdAt, nickname FROM post LEFT JOIN user ON post.authorId = user.id WHERE (title LIKE ? OR content LIKE ?) AND post.authorId = ? ORDER BY createdAt DESC",
    countSearchPost: "SELECT COUNT(*) as count FROM post  WHERE (title LIKE ? OR content LIKE ?) AND post.authorId = ?",
    createPost: "INSERT INTO post (title, content, categoryId, authorId) VALUES (?, ?, ?, ?)",
    deletePost: "DELETE FROM post WHERE id = ?",
    getPostAll: "SELECT post.id, title, content, createdAt, nickname FROM post LEFT JOIN user ON post.authorId = user.id WHERE post.authorId = ? ORDER BY createdAt DESC",
    getPostCount: "SELECT COUNT(*) AS postCount FROM post WHERE authorId = ?",
    getPostByCategory: "SELECT post.id, title, content, createdAt, nickname FROM post LEFT JOIN user ON post.authorId = user.id WHERE post.authorId = ? AND post.categoryId = ? ORDER BY createdAt DESC",
    getPostCountByCategory: "SELECT COUNT(*) AS postCount FROM post WHERE authorId = ? AND categoryId = ?",
    getPostByPid: "SELECT post.id, title, content, createdAt, categoryName, nickname FROM post LEFT JOIN user ON post.authorId = user.id LEFT JOIN category ON post.categoryId = category.id WHERE post.id = ?",
};
exports.default = postQueries;
//# sourceMappingURL=post.queries.js.map