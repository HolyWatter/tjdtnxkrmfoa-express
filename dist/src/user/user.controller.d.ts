import Controller from "../interface/controller.interface";
import UserService from "./user.service";
declare class UserController implements Controller {
    path: string;
    router: import("express-serve-static-core").Router;
    userService: UserService;
    constructor();
    private initializeRoutes;
    private currentUser;
}
export default UserController;
