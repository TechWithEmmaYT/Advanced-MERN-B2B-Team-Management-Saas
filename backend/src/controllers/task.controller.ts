import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "../config/http.config";
import {
  createTaskSchema,
  taskIdSchema,
  updateFieldsSchema,
  updateTaskSchema,
} from "../validation/task.validation";
import { workspaceIdSchema } from "../validation/workspace.validation";
import { projectIdSchema } from "../validation/project.validation";
import {
  createTaskService,
  deleteTaskService,
  getAllTasksService,
  getTaskByIdService,
  getTaskEnumsService,
  updateTaskService,
} from "../services/task.service";
import { getMemberRoleInWorkspace } from "../services/member.service";
import { Permissions } from "../enums/role.enum";
import { roleGuard } from "../utils/roleGuard";

export const createTask = asyncHandler(async (req: Request, res: Response) => {
  const body = createTaskSchema.parse(req.body);
  const projectId = projectIdSchema.parse(req.params.projectId);
  const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
  const userId = req.user?._id;

  const { role } = await getMemberRoleInWorkspace(userId, workspaceId);

  roleGuard(role, [Permissions.CREATE_TASK]);

  const { task } = await createTaskService(
    userId,
    workspaceId,
    projectId,
    body
  );
  return res.status(HTTPSTATUS.OK).json({
    message: "Task created successfully",
    task,
  });
});

export const getAllTasks = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;

  const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);

  const filters = {
    projectId: req.query.projectId as string | undefined,
    status: req.query.status
      ? (req.query.status as string)?.split(",")
      : undefined,
    priority: req.query.priority
      ? (req.query.priority as string)?.split(",")
      : undefined,
    assignedTo: req.query.assignedTo
      ? (req.query.assignedTo as string)?.split(",")
      : undefined,
    keyword: req.query.keyword as string | undefined,
    dueDate: req.query.dueDate as string | undefined,
  };

  const pagination = {
    pageSize: parseInt(req.query.pageSize as string) || 10,
    pageNumber: parseInt(req.query.pageNumber as string) || 1,
  };

  const { role } = await getMemberRoleInWorkspace(userId, workspaceId);
  roleGuard(role, [Permissions.VIEW_ONLY]);

  const result = await getAllTasksService(workspaceId, filters, pagination);

  return res.status(HTTPSTATUS.OK).json({
    message: "Task fetched successfully",
    ...result,
  });
});

export const getTaskById = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;

  const taskId = taskIdSchema.parse(req.params.id);
  const projectId = projectIdSchema.parse(req.params.projectId);
  const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);

  const { role } = await getMemberRoleInWorkspace(userId, workspaceId);

  roleGuard(role, [Permissions.VIEW_ONLY]);

  const task = await getTaskByIdService(workspaceId, projectId, taskId);

  return res.status(HTTPSTATUS.OK).json({
    message: "Task fetched successfully",
    task,
  });
});

export const getTaskEnums = asyncHandler(
  async (req: Request, res: Response) => {
    const enums = getTaskEnumsService();
    return res.status(HTTPSTATUS.OK).json({
      message: "Enums retrieved successfully",
      enums,
    });
  }
);

export const updateTask = asyncHandler(async (req: Request, res: Response) => {
  const taskId = taskIdSchema.parse(req.params.id);
  const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
  const projectId = projectIdSchema.parse(req.params.projectId);

  const body = updateTaskSchema.parse(req.body);

  const userId = req.user?._id;

  const { role } = await getMemberRoleInWorkspace(userId, workspaceId);

  roleGuard(role, [Permissions.EDIT_TASK]);

  const { updatedTask } = await updateTaskService(
    taskId,
    projectId,
    workspaceId,
    body
  );

  return res.status(HTTPSTATUS.OK).json({
    message: "Task updated successfully",
    task: updatedTask,
  });
});

export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;

  const taskId = taskIdSchema.parse(req.params.id);
  const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);

  const { role } = await getMemberRoleInWorkspace(userId, workspaceId);

  // Ensure the user has the required permissions
  roleGuard(role, [Permissions.DELETE_TASK]);

  await deleteTaskService(taskId, workspaceId);

  return res.status(HTTPSTATUS.OK).json({
    message: "Task deleted successfully",
  });
});
