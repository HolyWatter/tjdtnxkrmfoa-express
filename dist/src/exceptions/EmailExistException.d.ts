import HttpException from "./HttpException";
declare class EmailException extends HttpException {
    constructor(email: string);
}
export default EmailException;
