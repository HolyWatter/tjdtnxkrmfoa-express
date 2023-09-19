const userQueries = {
  getUserByEmail: "SELECT * FROM user WHERE email = ?",
  createUser:
    "INSERT INTO user (name, nickname, email, password) VALUES (?, ?, ?, ?)",
};

export default userQueries;
