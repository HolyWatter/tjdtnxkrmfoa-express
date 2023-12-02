"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const categoryQueries = {
    getCategoryInfoByCid: "SELECT id, categoryName FROM category WHERE userId = ? AND id = ?",
    getUserCategory: "SELECT category.id, categoryName, COUNT(post.id) AS postCount FROM category LEFT JOIN post ON post.categoryID = category.id WHERE userId = ? GROUP BY category.id",
    createCategory: "INSERT INTO category (categoryName, userId) VALUES (? , ?)",
    deleteCategory: "DELETE FROM category WHERE id = ?",
    updateCategory: "UPDATE category SET categoryName = ? WHERE id = ?",
};
exports.default = categoryQueries;
//# sourceMappingURL=category.queries.js.map