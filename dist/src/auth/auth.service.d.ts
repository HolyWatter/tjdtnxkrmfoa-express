import UserCreateDto from "../user/dto.ts/user.create.dto";
import { Connection } from "mysql2/typings/mysql/lib/Connection";
import LogInDto from "./dto/login.dto";
declare class AuthService {
    private db;
    constructor(db: Connection);
    register: (userData: UserCreateDto) => Promise<any>;
    login: (loginData: LogInDto) => Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    signJwt: (payload: any) => Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
export default AuthService;
