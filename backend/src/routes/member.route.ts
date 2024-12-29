import { Router } from "express";
import {
  getAllMemberRoles,
  joinWorkspace,
} from "../controllers/member.controller";

const memberRoutes = Router();

memberRoutes.post("/workspace/:inviteCode/join", joinWorkspace);
memberRoutes.get("/roles", getAllMemberRoles);

export default memberRoutes;
