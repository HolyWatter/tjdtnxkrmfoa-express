import { Router } from "express";
import Controller from "../interface/controller.interface";

class AuthController implements Controller {
  public path = "/auth";
  public router = Router();

  constructor() {
    this.router.post(`${this.router}/register`, () => {});
    this.router.post(`${this.router}/login`);
    this.router.post(`${this.router}/logout`);
  }
}
