"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const authMiddleware_1 = require("../middleware/authMiddleware");
const multer = require("multer");
class MediaController {
    constructor() {
        this.path = "/media";
        this.router = (0, express_1.Router)();
        this.AWS = AWS;
        this.initializeS3();
        this.ininitalizeRoute();
    }
    ininitalizeRoute() {
        this.router.post(`${this.path}/image`, authMiddleware_1.default, this.upload.single("image"), this.uploadImage);
    }
    initializeS3() {
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY,
            region: "ap-northeast-2",
        });
        this.s3 = new AWS.S3();
        this.upload = multer({
            storage: multerS3({
                s3: this.s3,
                bucket: "tjdtnxkrmfoa",
                key: (req, file, cb) => {
                    cb(null, "image/" + file.originalname);
                },
            }),
        });
    }
    uploadImage(req, res) {
        return res.json({
            link: req.file.location,
        });
    }
}
exports.default = MediaController;
//# sourceMappingURL=media.controller.js.map