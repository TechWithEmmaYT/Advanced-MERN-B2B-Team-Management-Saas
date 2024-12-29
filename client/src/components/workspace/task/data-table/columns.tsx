"use client";

import { ColumnDef } from "@tanstack/react-table";

// import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { assignees, priorities, projects, statuses } from "./data";
import { Task } from "./schema";
import { DataTableColumnHeader } from "./table-column-header";
import { DataTableRowActions } from "./table-row-actions";
import { Badge } from "@/components/ui/badge";
import {
  TaskPriorityEnum,
  TaskStatusEnum,
  TaskStatusEnumType,
} from "@/constant";
import { formatStatusToEnum } from "@/lib/helper";
import { TaskPriorityEnumType } from "../../../../../../backend/src/enums/task.enum";

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label);
      return (
        <div className="flex space-x-2">
          <Badge variant="outline">Task-12</Badge>
          <span className="lg:max-w-[300px] max-w-[200px] truncate font-medium">
            {row.original.title}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "project",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Project" />
    ),
    cell: ({ row }) => {
      const project = projects.find(
        (project) => project.value === row.getValue("project")
      );

      if (!project) {
        return null;
      }

      return (
        <div className="flex items-center">
          {project.icon}
          <span>{project.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "assigneeId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assignee" />
    ),
    cell: ({ row }) => {
      const assignee = assignees.find(
        (assignee) => assignee.value === row.getValue("assigneeId")
      );

      if (!assignee) {
        return null;
      }

      return (
        <div className="flex lg:w-[100px] items-center">
          {assignee.icon && (
            <assignee.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{assignee.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Due Date" />
    ),
    cell: ({ row }) => {
      return (
        <span className="lg:max-w-[100px] text-sm">{row.original.dueDate}</span>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      const statusKey = formatStatusToEnum(status.value) as TaskStatusEnumType;

      return (
        <div className="flex lg:w-[120px] items-center">
          <Badge
            variant={TaskStatusEnum[statusKey]}
            className="flex w-auto p-1 px-2 gap-1 font-medium shadow-sm uppercase border-0"
          >
            <status.icon className="h-4 w-4 rounded-full text-inherit" />
            <span>{status.label}</span>
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority")
      );

      if (!priority) {
        return null;
      }

      const statusKey = formatStatusToEnum(
        priority.value
      ) as TaskPriorityEnumType;

      return (
        <div className="flex items-center">
          <Badge
            variant={TaskPriorityEnum[statusKey]}
            className="flex lg:w-[110px] p-1 gap-1 !bg-transparent font-medium !shadow-none uppercase border-0"
          >
            <priority.icon className="h-4 w-4 rounded-full text-inherit" />
            <span>{priority.label}</span>
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
