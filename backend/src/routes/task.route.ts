import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  getTaskEnums,
  updateTask,
} from "../controllers/task.controller";

const taskRoutes = Router();

taskRoutes.get("/workspace/:workspaceId/all", getAllTasks);
//Not Needed
taskRoutes.get("/enums", getTaskEnums);

taskRoutes.get("/:id/project/:projectId/workspace/:workspaceId", getTaskById);

taskRoutes.post(
  "/project/:projectId/workspace/:workspaceId/create",
  createTask
);
taskRoutes.put(
  "/:id/project/:projectId/workspace/:workspaceId/update",
  updateTask
);

taskRoutes.delete("/:id/workspace/:workspaceId/delete", deleteTask);

export default taskRoutes;
