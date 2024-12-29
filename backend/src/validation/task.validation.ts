import { z } from "zod";
import { TaskPriorityEnum, TaskStatusEnum } from "../enums/task.enum";

export const titleSchema = z.string().trim().min(1).max(255);
export const descriptionSchema = z.string().trim().optional();
export const assignedToSchema = z.string().trim().min(1).nullable().optional();

export const dueDateSchema = z
  .string()
  .trim()
  .optional()
  .refine(
    (val) => {
      return !val || !isNaN(Date.parse(val)); // Check if it's a valid date string or empty
    },
    {
      message: "Invalid date format. Please provide a valid date string.",
    }
  );

export const prioritySchema = z.enum(
  Object.values(TaskPriorityEnum) as [string, ...string[]]
);

export const statusSchema = z.enum(
  Object.values(TaskStatusEnum) as [string, ...string[]]
);

export const taskIdSchema = z.string().trim().min(1);

//export const prioritySchema = z.enum(["LOW", "MEDIUM", "HIGH","URGENT"]);

export const createTaskSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
  priority: prioritySchema,
  status: statusSchema,
  assignedTo: assignedToSchema,
  dueDate: dueDateSchema,
});

export const updateTaskSchema = z.object({
  title: titleSchema.optional(),
  description: descriptionSchema.optional(),
  priority: prioritySchema.optional(),
  status: statusSchema.optional(),
  assignedTo: assignedToSchema.optional(),
  dueDate: dueDateSchema.optional(),
});

export const updateFieldsSchema = z.object({
  priority: prioritySchema.optional(),
  status: statusSchema.optional(),
});
