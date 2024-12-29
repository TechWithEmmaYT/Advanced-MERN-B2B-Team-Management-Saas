import { Router } from "express";
import {
  createTask,
  getAllTasks,
  getTaskById,
  getTaskEnums,
  updateTask,
} from "../controllers/task.controller";

const taskRoutes = Router();

taskRoutes.post(
  "/project/:projectId/workspace/:workspaceId/create",
  createTask
);
taskRoutes.put(
  "/:id/project/:projectId/workspace/:workspaceId/update",
  updateTask
);

taskRoutes.delete("/:id/project/:projectId/workspace/:workspaceId/delete");

taskRoutes.get("/enums", getTaskEnums);

taskRoutes.get("/workspace/:workspaceId/all", getAllTasks);

taskRoutes.get("/:id/project/:projectId/workspace/:workspaceId", getTaskById);

export default taskRoutes;
