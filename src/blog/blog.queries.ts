const blogQueries = {
  findUserBlogInfo:
    "SELECT blogInfo.id, blogName, description, thumbnailUrl, name, email, nickname FROM blogInfo LEFT JOIN user ON blogInfo.id = user.id  WHERE blogInfo.id = ?",
  createBlog: "INSERT INTO blogInfo (id) VALUES (?)",
  deleteBlog: "DELETE FROM blogInfo WHERE id = ?",
  updateBlogInfo:
    "UPDATE blogInfo SET blogName = ? , description = ?, thumbnailUrl = ? WHERE id = ?",
};

export default blogQueries;
