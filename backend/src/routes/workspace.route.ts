import { Router } from "express";
import {
  createWorkspace,
  deleteWorkspaceById,
  getUserWorkspaces,
  getWorkspaceMembers,
  getWorkspaceById,
  updateWorkspaceById,
  leaveWorkspace,
  changeWorkspaceMemberRole,
  getWorkspaceAnalytics,
} from "../controllers/workspace.controller";

const workspaceRoutes = Router();

workspaceRoutes.post("/create/new", createWorkspace);
workspaceRoutes.put("/update/:id", updateWorkspaceById);
workspaceRoutes.put("/change/member/role/:id", changeWorkspaceMemberRole);

workspaceRoutes.delete("/leave/:id", leaveWorkspace);
workspaceRoutes.delete("/delete/:id", deleteWorkspaceById);

workspaceRoutes.get("/all", getUserWorkspaces);
workspaceRoutes.get("/members/:id", getWorkspaceMembers);
workspaceRoutes.get("/analytics/:id", getWorkspaceAnalytics);
workspaceRoutes.get("/:id", getWorkspaceById);

export default workspaceRoutes;
