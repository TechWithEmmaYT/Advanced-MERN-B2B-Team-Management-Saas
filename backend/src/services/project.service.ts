import mongoose from "mongoose";
import ProjectModel from "../models/project.model";
import TaskModel from "../models/task.model";
import { NotFoundException } from "../utils/appError";

export const createProjectService = async (
  userId: string,
  workspaceId: string,
  projectData: { emoji?: string; name: string; description?: string }
) => {
  // Create the project
  const project = new ProjectModel({
    ...(projectData.emoji && { emoji: projectData.emoji }),
    name: projectData.name,
    description: projectData.description,
    workspace: workspaceId,
    createdBy: userId,
  });

  await project.save();

  return { project };
};

export const getProjectsInWorkspaceService = async (
  workspaceId: string,
  pageSize: number,
  pageNumber: number
): Promise<any> => {
  // Step 1: Find all projects in the workspace
  const totalCount = await ProjectModel.countDocuments({
    workspace: workspaceId,
  });

  const skip = (pageNumber - 1) * pageSize;

  const projects = await ProjectModel.find({ workspace: workspaceId })
    .skip(skip)
    .limit(pageSize)
    .populate("createdBy", "_id name profilePicture -password")
    .sort({ createdAt: -1 });

  const totalPages = Math.ceil(totalCount / pageSize);

  return { projects, totalCount, totalPages, skip };
};

export const getProjectByIdService = async (
  workspaceId: string,
  projectId: string
) => {
  // Fetch the project, ensuring it's from the specified workspace
  const project = await ProjectModel.findOne({
    _id: projectId,
    workspace: workspaceId,
  }).select("_id emoji name description");
  // .populate("workspace")
  // .populate("createdBy");

  if (!project) {
    throw new NotFoundException(
      "Project not found or does not belong to the specified workspace"
    );
  }

  return { project };
};

export const getProjectAnalyticsService = async (
  projectId: string,
  workspaceId: string
) => {
  const project = await ProjectModel.findById(projectId);
  if (!project || project.workspace.toString() !== workspaceId.toString()) {
    throw new NotFoundException(
      "Project not found or does not belong to this workspace"
    );
  }

  const currentDate = new Date();

  //**** */ USING Multiple countDocument
  const totalTasks = await TaskModel.countDocuments({ project: projectId });
  const overdueTasks = await TaskModel.countDocuments({
    project: projectId,
    dueDate: { $lt: currentDate },
    status: { $ne: "DONE" }, // Exclude completed tasks
  });
  const completedTasks = await TaskModel.countDocuments({
    project: projectId,
    status: "DONE",
  });

  //**** */ USING Mongoose aggregate  to query faster
  // const taskAnalytics = await TaskModel.aggregate([
  //   { $match: { project: new mongoose.Types.ObjectId(projectId) } },
  //   {
  //     $facet: {
  //       totalTasks: [{ $count: "count" }],
  //       overdueTasks: [
  //         {
  //           $match: { dueDate: { $lt: currentDate }, status: { $ne: "DONE" } },
  //         },
  //         { $count: "count" },
  //       ],
  //       assignedTasks: [
  //         { $match: { assignedTo: { $ne: null } } },
  //         { $count: "count" },
  //       ],
  //       completedTasks: [{ $match: { status: "DONE" } }, { $count: "count" }],
  //     },
  //   },
  // ]);

  // const _analytics = taskAnalytics[0];

  // const analytics = {
  //   totalTasks: _analytics.totalTasks[0]?.count || 0,
  //   overdueTasks: _analytics.overdueTasks[0]?.count || 0,
  //   assignedTasks: _analytics.assignedTasks[0]?.count || 0,
  //   completedTasks: _analytics.completedTasks[0]?.count || 0,
  // };

  const analytics = {
    totalTasks,
    overdueTasks,
    completedTasks,
  };

  return { analytics };
};

export const updateProjectService = async (
  projectId: string,
  workspaceId: string,
  updateData: { emoji?: string; name?: string; description?: string }
) => {
  // Find the project by ID and workspace ID
  const project = await ProjectModel.findOne({
    _id: projectId,
    workspace: workspaceId,
  });

  if (!project) {
    throw new NotFoundException(
      "Project not found or does not belong to the specified workspace"
    );
  }

  // Update the project with the new data
  if (updateData.emoji) {
    project.emoji = updateData.emoji;
  }

  if (updateData.name) {
    project.name = updateData.name;
  }
  if (updateData.description) {
    project.description = updateData.description;
  }

  await project.save();

  return { project };
};

export const deleteProjectService = async (
  projectId: string,
  workspaceId: string
) => {
  // Find the project by ID and workspace ID
  const project = await ProjectModel.findOne({
    _id: projectId,
    workspace: workspaceId,
  });

  if (!project) {
    throw new NotFoundException(
      "Project not found or does not belong to the specified workspace"
    );
  }
  await project.deleteOne();

  await TaskModel.deleteMany({ projectId: project._id });

  return project;
};
