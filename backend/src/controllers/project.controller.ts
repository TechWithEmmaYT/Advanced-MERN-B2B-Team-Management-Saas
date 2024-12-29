import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "../config/http.config";
import {
  createProjectSchema,
  projectIdSchema,
  updateProjectSchema,
} from "../validation/project.validation";
import { workspaceIdSchema } from "../validation/workspace.validation";
import { getMemberRoleInWorkspace } from "../services/member.service";
import { roleGuard } from "../utils/roleGuard";
import { Permissions } from "../enums/role.enum";
import {
  createProjectService,
  deleteProjectService,
  getProjectAnalyticsService,
  getProjectByIdService,
  getProjectsInWorkspaceService,
  updateProjectService,
} from "../services/project.service";

export const createProject = asyncHandler(
  async (req: Request, res: Response) => {
    const body = createProjectSchema.parse({
      ...req.body,
    });
    const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
    const userId = req.user?._id;

    const { role } = await getMemberRoleInWorkspace(userId, workspaceId);
    // Ensure the user has the required permissions
    roleGuard(role, [Permissions.CREATE_PROJECT]);

    const { project } = await createProjectService(userId, workspaceId, body);

    return res.status(HTTPSTATUS.CREATED).json({
      message: "Project created successfully",
      project,
    });
  }
);

export const getAllProjectsInWorkspace = asyncHandler(
  async (req: Request, res: Response) => {
    const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
    const userId = req.user?._id;

    const { role } = await getMemberRoleInWorkspace(userId, workspaceId);

    // Ensure the user has the required permissions
    roleGuard(role, [Permissions.VIEW_ONLY]);

    const pageSize = parseInt(req.query.pageSize as string) || 10; // Default: 10 items per page
    const pageNumber = parseInt(req.query.pageNumber as string) || 1; // Default: page 1

    const { projects, totalCount, totalPages, skip } =
      await getProjectsInWorkspaceService(workspaceId, pageSize, pageNumber);

    return res.status(HTTPSTATUS.OK).json({
      message: "Project fetched successfully",
      projects,
      pagination: {
        totalCount,
        pageSize,
        pageNumber,
        totalPages,
        skip,
        limit: pageSize,
      },
    });
  }
);

export const getProjectByIdAndWorkspaceId = asyncHandler(
  async (req: Request, res: Response) => {
    const projectId = projectIdSchema.parse(req.params.id);
    const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);

    const userId = req.user?._id;

    const { role } = await getMemberRoleInWorkspace(userId, workspaceId);

    roleGuard(role, [Permissions.VIEW_ONLY]);

    const { project } = await getProjectByIdService(workspaceId, projectId);

    return res.status(HTTPSTATUS.OK).json({
      message: "Project fetched successfully",
      project,
    });
  }
);

export const getProjectAnalytics = asyncHandler(
  async (req: Request, res: Response) => {
    const projectId = projectIdSchema.parse(req.params.id);
    const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);

    const userId = req.user?._id;

    const { role } = await getMemberRoleInWorkspace(userId, workspaceId);

    roleGuard(role, [Permissions.VIEW_ONLY]);

    const { analytics } = await getProjectAnalyticsService(
      projectId,
      workspaceId
    );

    return res.status(HTTPSTATUS.OK).json({
      message: "Project analytics retrieved successfully",
      analytics,
    });
  }
);

export const updateProject = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const projectId = projectIdSchema.parse(req.params.id);
    const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);

    const body = updateProjectSchema.parse({
      ...req.body,
    });

    const { role } = await getMemberRoleInWorkspace(userId, workspaceId);

    // Ensure the user has the required permissions
    roleGuard(role, [Permissions.EDIT_PROJECT]);

    const { project } = await updateProjectService(
      projectId,
      workspaceId,
      body
    );

    return res.status(HTTPSTATUS.OK).json({
      message: "Project updated successfully",
      project,
    });
  }
);

export const deleteProject = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const projectId = projectIdSchema.parse(req.params.id);
    const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);

    const { role } = await getMemberRoleInWorkspace(userId, workspaceId);

    // Ensure the user has the required permissions
    roleGuard(role, [Permissions.DELETE_PROJECT]);

    await deleteProjectService(projectId, workspaceId);

    return res.status(HTTPSTATUS.OK).json({
      message: "Project deleted successfully",
    });
  }
);
