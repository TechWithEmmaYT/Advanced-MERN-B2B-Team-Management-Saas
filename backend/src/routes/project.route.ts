import { Router } from "express";
import {
  createProject,
  getAllProjectsInWorkspace,
  getProjectByIdAndWorkspaceId,
  updateProject,
  deleteProject,
  getProjectAnalytics,
} from "../controllers/project.controller";

const projectRoutes = Router();

projectRoutes.post("/workspace/:workspaceId/create", createProject);
projectRoutes.put("/:id/workspace/:workspaceId/update", updateProject);
projectRoutes.delete("/:id/workspace/:workspaceId/delete", deleteProject);

projectRoutes.get("/workspace/:workspaceId/all", getAllProjectsInWorkspace);
projectRoutes.get("/:id/workspace/:workspaceId/analytics", getProjectAnalytics);
projectRoutes.get("/:id/workspace/:workspaceId", getProjectByIdAndWorkspaceId);

export default projectRoutes;
