import Controller from "../interface/controller.interface";
import * as AWS from "aws-sdk";
import * as multer from "multer";
declare class MediaController implements Controller {
    path: string;
    router: import("express-serve-static-core").Router;
    AWS: typeof AWS;
    s3: AWS.S3;
    upload: multer.Multer;
    constructor();
    private ininitalizeRoute;
    private initializeS3;
    private uploadImage;
}
export default MediaController;
