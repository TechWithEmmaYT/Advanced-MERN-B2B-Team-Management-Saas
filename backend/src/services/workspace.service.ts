import mongoose from "mongoose";
import { Roles } from "../enums/role.enum";
import MemberModel from "../models/member.model";
import RoleModel from "../models/roles-permission.model";
import UserModel from "../models/user.model";
import WorkspaceModel from "../models/workspace.model";
import { BadRequestException, NotFoundException } from "../utils/appError";
import ProjectModel from "../models/project.model";
import TaskModel from "../models/task.model";

export const createWorkspaceService = async (
  userId: string,
  body: {
    name: string;
    description?: string | undefined;
  }
) => {
  const { name, description } = body;
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new NotFoundException("User not found");
  }

  const ownerRole = await RoleModel.findOne({ name: Roles.OWNER });

  if (!ownerRole) {
    throw new NotFoundException("Owner role not found");
  }

  const workspace = new WorkspaceModel({
    name: name,
    description: description,
    owner: user._id,
  });
  await workspace.save();

  const member = new MemberModel({
    userId: user._id,
    workspaceId: workspace._id,
    role: ownerRole._id,
    joinedAt: new Date(),
  });
  await member.save();

  // Update the user's current workspace after creating the workspace
  user.currentWorkspace = workspace._id as mongoose.Types.ObjectId;
  await user.save();

  return {
    workspace,
  };
};

export const getUserWorkspacesService = async (userId: string) => {
  // Find all memberships where the user is involved
  const memberships = await MemberModel.find({ userId })
    .populate("workspaceId")
    .select("-password")
    .exec();
  // Extract workspace details from memberships
  const workspaces = memberships.map((membership) => membership.workspaceId);

  return { workspaces };
};

export const getWorkspaceByIdService = async (workspaceId: string) => {
  const workspace = await WorkspaceModel.findById(workspaceId).select(
    "-password"
  );
  return { workspace };
};

export const getWorkspaceMembersService = async (workspaceId: string) => {
  // Fetch all members of the workspace
  const members = await MemberModel.find({ workspaceId })
    .populate("userId", "name email profilePicture -password")
    .populate("role", "name");

  return { members };
};

export const getWorkspaceAnalyticsService = async (workspaceId: string) => {
  const currentDate = new Date();
  // Total projects in the workspace
  const totalProjects = await ProjectModel.countDocuments({
    workspace: workspaceId,
  });

  const totalTasks = await TaskModel.countDocuments({ workspace: workspaceId });

  const overdueTasks = await TaskModel.countDocuments({
    workspace: workspaceId,
    dueDate: { $lt: currentDate },
    status: { $ne: "DONE" }, // Exclude completed tasks
  });

  const assignedTasks = await TaskModel.countDocuments({
    workspace: workspaceId,
    assignedTo: { $ne: null },
  });

  const completedTasks = await TaskModel.countDocuments({
    workspace: workspaceId,
    status: "DONE",
  });

  const analytics = {
    totalProjects,
    totalTasks,
    overdueTasks,
    assignedTasks,
    completedTasks,
  };

  return { analytics };
};

export const changeMemberRoleService = async (
  workspaceId: string,
  memberId: string,
  roleId: string
) => {
  const workspace = await WorkspaceModel.findById(workspaceId);
  if (!workspace) {
    throw new NotFoundException("Workspace not found");
  }

  const role = await RoleModel.findById(roleId);
  if (!role) {
    throw new NotFoundException("Role not found");
  }

  const member = await MemberModel.findOne({
    userId: memberId,
    workspaceId: workspaceId,
  });

  if (!member) {
    throw new Error("Member not found in the workspace");
  }

  member.role = role;
  await member.save();

  return {
    member,
  };
};

export const leaveWorkspaceService = async (
  userId: string,
  workspaceId: string
) => {
  const workspace = await WorkspaceModel.findById(workspaceId);
  if (!workspace) {
    throw new NotFoundException("Workspace not found");
  }
  if (workspace.owner.toString() === userId.toString()) {
    throw new BadRequestException(
      "You cannot leave a workspace you own. Transfer ownership first or delete the workspace"
    );
  }

  // Remove the user from the workspace members
  await MemberModel.findOneAndDelete({ userId, workspaceId });

  // Update the user's currentWorkspace to null if it matches the workspace being left
  const user = await UserModel.findById(userId);
  if (user?.currentWorkspace?.toString() === workspaceId) {
    user.currentWorkspace = null;
    await user.save();
  }

  return true;
};

export const updateWorkspaceByIdService = async (
  workspaceId: string,
  name: string,
  description?: string
) => {
  const workspace = await WorkspaceModel.findById(workspaceId);

  if (!workspace) {
    throw new NotFoundException("Workspace not found");
  }

  // Update the workspace details
  workspace.name = name || workspace.name;
  workspace.description = description || workspace.description;

  await workspace.save();

  return { workspace };
};

export const deleteWorkspaceService = async (workspaceId: string) => {
  const workspace = await WorkspaceModel.findById(workspaceId);
  if (!workspace) {
    throw new NotFoundException("Workspace not found");
  }

  await workspace.deleteOne();

  await MemberModel.deleteMany({ workspaceId: workspace._id });
};
