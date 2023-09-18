import db from "../../database";
import { User } from "../interface/userInterface";

const userRepository = {
  findAllUser: async () => {
    const query = "SELECT * FROM user";
    const result = await db.promise().query(query);

    return result[0];
  },

  createUser: async ({ name, nickname, email, password }: User) => {
    return db.execute(
      "INSERT INTO user (name, nickname, email, password) VALUES (?, ?, ?, ?)",
      [name, nickname, email, password]
    );
  },
};

export default userRepository;
