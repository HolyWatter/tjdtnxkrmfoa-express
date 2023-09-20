import HttpException from "./HttpException";

class InvalidLoginException extends HttpException {
  constructor() {
    super(400, "로그인 정보가 잘 못 됐습니다.");
  }
}

export default InvalidLoginException;
