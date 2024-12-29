import { Request, Response } from "express";

import { HTTPSTATUS } from "../config/http.config";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import {
  changeRoleSchema,
  createWorkspaceSchema,
  updateWorkspaceSchema,
  workspaceIdSchema,
} from "../validation/workspace.validation";
import {
  changeMemberRoleService,
  createWorkspaceService,
  deleteWorkspaceService,
  getUserWorkspacesService,
  getWorkspaceAnalyticsService,
  getWorkspaceByIdService,
  getWorkspaceMembersService,
  leaveWorkspaceService,
  updateWorkspaceByIdService,
} from "../services/workspace.service";
import { getMemberRoleInWorkspace } from "../services/member.service";
import { roleGuard } from "../utils/roleGuard";
import { Permissions } from "../enums/role.enum";

export const createWorkspace = asyncHandler(
  async (req: Request, res: Response) => {
    const body = createWorkspaceSchema.parse(req.body);
    const userId = req.user?._id;

    const { workspace } = await createWorkspaceService(userId, body);
    return res.status(HTTPSTATUS.CREATED).json({
      message: "Workspace created successfully",
      workspace,
    });
  }
);
// Controller: Get all workspaces the user is part of
export const getUserWorkspaces = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const { workspaces } = await getUserWorkspacesService(userId);

    return res.status(HTTPSTATUS.OK).json({
      message: "User workspaces fetched successfully",
      workspaces,
    });
  }
);

export const getWorkspaceById = asyncHandler(
  async (req: Request, res: Response) => {
    const workspaceId = workspaceIdSchema.parse(req.params.id);
    const userId = req.user?._id;

    await getMemberRoleInWorkspace(userId, workspaceId);

    const { workspace } = await getWorkspaceByIdService(workspaceId);

    return res.status(HTTPSTATUS.OK).json({
      message: "Workspace fetched successfully",
      workspace,
    });
  }
);

export const getWorkspaceMembers = asyncHandler(
  async (req: Request, res: Response) => {
    const workspaceId = workspaceIdSchema.parse(req.params.id);
    const userId = req.user?._id;

    const { role } = await getMemberRoleInWorkspace(userId, workspaceId);
    roleGuard(role, [Permissions.VIEW_ONLY]);

    const { members } = await getWorkspaceMembersService(workspaceId);

    return res.status(HTTPSTATUS.OK).json({
      message: "Workspace members retrieved successfully",
      members,
    });
  }
);

export const getWorkspaceAnalytics = asyncHandler(
  async (req: Request, res: Response) => {
    const workspaceId = workspaceIdSchema.parse(req.params.id);
    const userId = req.user?._id;

    const { role } = await getMemberRoleInWorkspace(userId, workspaceId);

    roleGuard(role, [Permissions.VIEW_ONLY]);

    const { analytics } = await getWorkspaceAnalyticsService(workspaceId);

    return res.status(HTTPSTATUS.OK).json({
      message: "Workspace analytics retrieved successfully",
      analytics,
    });
  }
);

export const changeWorkspaceMemberRole = asyncHandler(
  async (req: Request, res: Response) => {
    const workspaceId = workspaceIdSchema.parse(req.params.id);
    const { memberId, roleId } = changeRoleSchema.parse(req.body);

    const userId = req.user?._id;

    const { role } = await getMemberRoleInWorkspace(userId, workspaceId);
    roleGuard(role, [Permissions.CHANGE_MEMBER_ROLE]);

    const { member } = await changeMemberRoleService(
      workspaceId,
      memberId,
      roleId
    );

    return res.status(HTTPSTATUS.OK).json({
      message: "Member Role changed successfully",
      member,
    });
  }
);

export const leaveWorkspace = asyncHandler(
  async (req: Request, res: Response) => {
    const workspaceId = workspaceIdSchema.parse(req.params.id);
    const userId = req.user?._id;

    await getMemberRoleInWorkspace(userId, workspaceId);

    await leaveWorkspaceService(userId, workspaceId);

    return res.status(HTTPSTATUS.OK).json({
      message: "You have successfully left the workspace",
    });
  }
);

export const updateWorkspaceById = asyncHandler(
  async (req: Request, res: Response) => {
    const workspaceId = workspaceIdSchema.parse(req.params.id);
    const { name, description } = updateWorkspaceSchema.parse({
      ...req.body,
    });
    const userId = req.user?._id;

    const { role } = await getMemberRoleInWorkspace(userId, workspaceId);

    // Ensure the user has the required permissions
    roleGuard(role, [Permissions.EDIT_WORKSPACE]);

    const { workspace } = await updateWorkspaceByIdService(
      workspaceId,
      name,
      description
    );

    return res.status(HTTPSTATUS.OK).json({
      message: "Workspace updated successfully",
      workspace,
    });
  }
);

export const deleteWorkspaceById = asyncHandler(
  async (req: Request, res: Response) => {
    const workspaceId = workspaceIdSchema.parse(req.params.id);
    const userId = req.user?._id;

    const { role } = await getMemberRoleInWorkspace(userId, workspaceId);

    roleGuard(role, [Permissions.DELETE_WORKSPACE]);

    await deleteWorkspaceService(workspaceId);

    return res.status(HTTPSTATUS.OK).json({
      message: "Workspace deleted successfully",
    });
  }
);
