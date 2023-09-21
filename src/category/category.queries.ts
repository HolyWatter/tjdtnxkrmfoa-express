const categoryQueries = {
  getUserCategory: "SELECT id, categoryName FROM category WHERE userId = ?",
  createCategory: "INSERT INTO category (categoryName, userId) VALUES (? , ?)",
  deleteCategory: "DELETE FROM category WHERE id = ?",
  updateCategory: "UPDATE category SET categoryName = ? WHERE id = ?",
};

export default categoryQueries;
