import { parseAsString, useQueryStates } from "nuqs";

const useTaskTableFilter = () => {
  return useQueryStates({
    status: parseAsString,
    priority: parseAsString,
    title: parseAsString,
    projectId: parseAsString,
    assigneeId: parseAsString,
  });
};

export default useTaskTableFilter;
