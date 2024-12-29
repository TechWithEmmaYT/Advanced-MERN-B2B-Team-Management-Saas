import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { config } from "../config/app.config";
import { HTTPSTATUS } from "../config/http.config";
import { registerSchema } from "../validation/auth.validation";
import { registerUserService } from "../services/auth.service";
import passport from "passport";

export const googleLoginCallback = asyncHandler(
  async (req: Request, res: Response) => {
    return res.redirect(`${config.FRONTEND_ORIGIN}/workspace?status=success`);
  }
);

export const registerUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = registerSchema.parse({
      ...req.body,
    });
    await registerUserService(body);
    return res.status(HTTPSTATUS.CREATED).json({
      message: "User registered successfully",
    });
  }
);

export const loginController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "local",
      (
        err: Error | null,
        user: Express.User | false,
        info: { message: string } | undefined
      ) => {
        if (err) {
          return next(err); // Pass errors to Express error handler
        }

        if (!user) {
          return res.status(HTTPSTATUS.UNAUTHORIZED).json({
            message: info?.message || "Invalid email or password",
          });
        }

        //console.log(user, "loginController");
        // Login the user and send response
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }

          return res.status(HTTPSTATUS.OK).json({
            message: "Logged in successfully",
            user,
          });
        });
      }
    )(req, res, next);
  }
);

export const logOut = asyncHandler(async (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ error: "Failed to log out" });
    }
  });
  return res.redirect(`${config.FRONTEND_ORIGIN}`);
});
