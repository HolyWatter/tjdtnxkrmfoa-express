import { Response, Router } from "express";
import Controller from "../interface/controller.interface";
import * as AWS from "aws-sdk";
import * as multerS3 from "multer-s3";
import authMiddleware from "../middleware/authMiddleware";
import * as multer from "multer";
import RequestWithUser from "../interface/requestWithUser.interface";

class MediaController implements Controller {
  public path = "/media";
  public router = Router();
  public AWS = AWS;
  public s3: AWS.S3;
  public upload: multer.Multer;

  constructor() {
    this.initializeS3();
    this.ininitalizeRoute();
  }

  private ininitalizeRoute() {
    this.router.post(
      `${this.path}/image`,
      authMiddleware,
      this.upload.single("image"),
      this.uploadImage
    );
  }

  private initializeS3() {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      region: "ap-northeast-2",
    });
    this.s3 = new AWS.S3();
    this.upload = multer({
      storage: multerS3({
        s3: this.s3 as any,
        bucket: "tjdtnxkrmfoa",
        key: (req, file, cb) => {
          cb(null, "image/" + file.originalname);
        },
      }),
    });
  }

  private uploadImage(req: RequestWithUser, res: Response) {
    return res.json({
      link: (req.file as any).location,
    });
  }
}

export default MediaController;
