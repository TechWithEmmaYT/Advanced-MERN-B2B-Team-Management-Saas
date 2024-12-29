import { UserDocument } from "../models/user.model";
import { Request } from "express";

declare global {
  namespace Express {
    interface User extends UserDocument {
      _id?: any;
    }
    interface Request {
      jwt?: string;
    }
  }
}
