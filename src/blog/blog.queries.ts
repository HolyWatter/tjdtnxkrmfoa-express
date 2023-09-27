const blogQueries = {
  findUserBlogInfo: "SELECT * FROM blogInfo WHERE id = ?",
  createBlog: "INSERT INTO blogInfo (id) VALUES (?)",
  deleteBlog: "DELETE FROM blogInfo WHERE id = ?",
  updateBlogInfo:
    "UPDATE blogInfo SET blogName = ? , description = ?, thumbnailUrl = ? WHERE id = ?",
};

export default blogQueries;
