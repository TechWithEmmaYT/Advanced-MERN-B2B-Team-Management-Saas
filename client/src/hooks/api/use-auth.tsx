import { useQuery } from "@tanstack/react-query";
import { getCurrentUserQueryFn } from "@/lib/api";

const useAuth = () => {
  const query = useQuery({
    queryKey: ["authUser"],
    queryFn: getCurrentUserQueryFn,
    //staleTime: Infinity,
    staleTime: 0,
    retry: 5,
  });
  return query;
};

export default useAuth;
