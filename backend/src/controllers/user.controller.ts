import { Request, Response } from "express";

import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { fetchCurrentUser } from "../services/user.service";
import { HTTPSTATUS } from "../config/http.config";

export const getCurrentUser = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const { user } = await fetchCurrentUser(userId);

    return res.status(HTTPSTATUS.OK).json({
      message: "Successfully logged in",
      user,
    });
  }
);
