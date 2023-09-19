import HttpException from "./HttpException";

class TokenException extends HttpException {
  constructor() {
    super(401, "Authentication token missing");
  }
}

export default TokenException;
