const blogQueries = {
  findUserBlogInfo: "SELECT * FROM blogInfo WHERE id = ?",
  createBlog: "INSERT INTO blogInfo (id) VALUES (?)",
  deleteBlog: "DELETE FROM blogInfo WHERE id = ?",
};

export default blogQueries;
