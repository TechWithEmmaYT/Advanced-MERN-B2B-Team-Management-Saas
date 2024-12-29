import React, { useEffect } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";
import { columns } from "./data-table/columns";
import { taskDummyData } from "./data-table/data";
import { DataTable } from "./data-table/table";
import useTaskTableFilter from "@/hooks/use-task-table-filter";

const TaskTable = () => {
  const [filters, setFilters] = useTaskTableFilter();
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  useEffect(() => {
    const formattedFilters = Object.entries(filters).map(([id, value]) => {
      const formattedValue =
        typeof value === "string" && value.includes(",")
          ? value.split(",").map((v) => v.trim()) // Split by comma and trim each value
          : value;

      return {
        id,
        value: formattedValue,
      };
    });

    if (formattedFilters.length > 0) setColumnFilters(formattedFilters);
    else setColumnFilters([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilter = (
    updater:
      | ColumnFiltersState
      | ((old: ColumnFiltersState) => ColumnFiltersState)
  ) => {
    const newFilters =
      typeof updater === "function" ? updater(columnFilters) : updater;

    console.log(newFilters, "newFilters");

    setColumnFilters(newFilters);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formattedFilters = newFilters.reduce<Record<string, any>>(
      (acc, filter) => {
        acc[filter.id] = filter.value;
        return acc;
      },
      {}
    );
    const _formattedFilters =
      Object.keys(formattedFilters).length === 0 ? null : formattedFilters;

    setFilters(_formattedFilters);
  };

  console.log(filters, "filters");

  return (
    <DataTable
      data={taskDummyData}
      columns={columns}
      columnFilters={columnFilters}
      onColumnFiltersChange={handleFilter}
    />
  );
};

export default TaskTable;
