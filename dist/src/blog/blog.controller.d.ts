import Controller from "../interface/controller.interface";
declare class BlogController implements Controller {
    path: string;
    router: import("express-serve-static-core").Router;
    private db;
    private blogService;
    constructor();
    private initializeRoute;
    private getUserBlog;
    private createBlog;
    private updateBlogInfo;
}
export default BlogController;
