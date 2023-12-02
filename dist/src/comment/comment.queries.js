"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commentQueries = {
    writeComment: "INSERT INTO comments (postId, username, password, comment) VALUES (?, ?, ?, ?)",
    getOneCommentWithPassword: "SELECT * FROM comments WHERE id = ?",
    deleteComment: "DELETE FROM comments WHERE id = ?",
};
exports.default = commentQueries;
//# sourceMappingURL=comment.queries.js.map