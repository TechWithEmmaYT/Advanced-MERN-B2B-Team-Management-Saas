import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "@/hooks/api/use-auth";
import { DashboardSkeleton } from "@/components/skeleton-loaders/dashboard-skeleton";
import { isAuthRoute } from "./common/routePaths";

const AuthRoute = () => {
  const location = useLocation();
  const { data: authData, isLoading } = useAuth();
  const user = authData?.user;

  const isLoginRoute = isAuthRoute(location.pathname);

  if (isLoading && !isLoginRoute) return <DashboardSkeleton />;

  if (!user) return <Outlet />;

  return <Navigate to={`/workspace/${user?.currentWorkspace?._id}`} replace />;
};

export default AuthRoute;
