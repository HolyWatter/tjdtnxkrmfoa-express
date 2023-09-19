import { IsString } from "class-validator";

class UserCreateDto {
  @IsString()
  name: string;

  @IsString()
  nickname: string;

  @IsString()
  password: string;

  @IsString()
  email: string;
}

export default UserCreateDto;
