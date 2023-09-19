import HttpException from "./HttpException";

class EmailException extends HttpException {
  constructor(email: string) {
    super(400, `${email}로 가입된 메일이 이미 존재합니다.`);
  }
}

export default EmailException;
