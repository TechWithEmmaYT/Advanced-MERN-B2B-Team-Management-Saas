import { useQuery } from "@tanstack/react-query";
import { getWorkspaceByIdQueryFn } from "@/lib/api";

const useGetWorkspaceQuery = (workspaceId: string) => {
  const query = useQuery({
    queryKey: ["workspace", workspaceId],
    queryFn: () => getWorkspaceByIdQueryFn(workspaceId),
    staleTime: Infinity,
    enabled: !!workspaceId,
  });

  return query;
};

export default useGetWorkspaceQuery;
