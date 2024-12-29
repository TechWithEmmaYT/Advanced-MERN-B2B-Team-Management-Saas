import { Request, Response } from "express";
import { z } from "zod";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "../config/http.config";
import {
  getAllMemberRolesService,
  joinWorkspaceByInvite,
} from "../services/member.service";

export const joinWorkspace = asyncHandler(
  async (req: Request, res: Response) => {
    const inviteCode = z.string().parse(req.params.inviteCode);
    const userId = req.user?._id;

    // Call service to add user to workspace
    const { workspace, role } = await joinWorkspaceByInvite(userId, inviteCode);

    return res.status(HTTPSTATUS.OK).json({
      message: "Successfully joined the workspace",
      workspace,
      role,
    });
  }
);

export const getAllMemberRoles = asyncHandler(
  async (req: Request, res: Response) => {
    const roles = await getAllMemberRolesService();
    return res.status(200).json({
      message: "Member roles retrieved successfully",
      roles,
    });
  }
);
