const userQueries = {
  getUserByEmail: "SELECT * FROM user WHERE email = ?",
  createUser:
    "INSERT INTO user (name, nickname, email, password) VALUES (?, ?, ?, ?)",
  getUserByEmailWithoutPassword:
    "SELECT id, name, nickname, email FROM user WHERE email = ?",
  getUserByUidWithoutPassword:
    "SELECT id, name, nickname, email FROM user WHERE id = ?",
  updateUserNickname: "UPDATE user SET nickname = ? WHERE id =?",
};

export default userQueries;
