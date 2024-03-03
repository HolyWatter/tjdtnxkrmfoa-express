import EmailException from "../exceptions/EmailExistException";
import * as bcrypt from "bcrypt";
import UserCreateDto from "../user/dto.ts/user.create.dto";
import { Connection } from "mysql2/typings/mysql/lib/Connection";
import { RowDataPacket } from "mysql2";
import userQueries from "../../src/user/user.queries";
import LogInDto from "./dto/login.dto";
import * as jwt from "jsonwebtoken";
import InvalidLoginException from "../exceptions/InvalidLoginException";
import WrongAuthenticationTokenException from "../exceptions/WrongAuthenticationExecption";

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

  public login = async (loginData: LogInDto) => {
    const { email, password } = loginData;

    const [rows] = (await this.db
      .promise()
      .query(userQueries.getUserByEmail, [email])) as RowDataPacket[];

    if (!rows.length) throw new InvalidLoginException();

    const isValidPassword = await bcrypt.compare(password, rows[0].password);

    if (!isValidPassword) throw new InvalidLoginException();

    const payload = {
      email: rows[0].email,
      sub: rows[0].id,
    };

    return this.signJwt(payload);
  };

  public refreshToken = (refreshToken: string) => {
    const isValid = jwt.verify(refreshToken, process.env.JWT_SECRET);

    if (isValid) {
      const { email, sub } = isValid as jwt.JwtPayload;
      return this.signJwt({ email, sub });
    } else {
      new WrongAuthenticationTokenException();
    }
  };

  public signJwt = async (payload) => {
    const secret = process.env.JWT_SECRET;
    const accessToken = jwt.sign(payload, secret, {
      expiresIn: "1m",
    });
    const refreshToken = jwt.sign(payload, secret, {
      expiresIn: "5d",
    });

    return { accessToken, refreshToken };
  };
}

export default AuthService;
