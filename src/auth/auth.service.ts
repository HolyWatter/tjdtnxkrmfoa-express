import EmailException from "../exceptions/EmailExistException";
import * as bcrypt from "bcrypt";
import UserCreateDto from "../user/dto.ts/user.create.dto";
import { Connection } from "mysql2/typings/mysql/lib/Connection";
import { RowDataPacket } from "mysql2";
import userQueries from "../../src/user/user.queries";
import LogInDto from "./dto/login.dto";

class AuthService {
  private db: Connection;

  constructor(db: Connection) {
    this.db = db;
  }

  public register = async (userData: UserCreateDto) => {
    const { email, password, name, nickname } = userData;
    const [rows] = (await this.db
      .promise()
      .query(userQueries.getUserByEmail, [email])) as RowDataPacket[];

    if (rows.length) {
      throw new EmailException(email);
    }

    const hashedPasswrod = await bcrypt.hash(password, 10);
    try {
      await this.db
        .promise()
        .execute(userQueries.createUser, [
          name,
          nickname,
          email,
          hashedPasswrod,
        ]);

      const [result] = await this.db
        .promise()
        .query(userQueries.getUserByEmail, [email]);

      return result[0];
    } catch (err) {}
  };

  public login = async (loginData: LogInDto) => {};
}

export default AuthService;
