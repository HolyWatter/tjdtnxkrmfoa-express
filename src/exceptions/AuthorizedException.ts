import HttpException from "./HttpException";

class AuthorizedException extends HttpException {
  constructor() {
    super(403, "You're not authorized");
  }
}

export default AuthorizedException;
