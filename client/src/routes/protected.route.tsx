import { Outlet } from "react-router-dom";
// import { Loader } from "lucide-react";
// import useAuth from "@/hooks/use-auth";

const ProtectedRoute = () => {
  //   const { data, isLoading } = useAuth();
  //   const user = data?.data?.user;

  //   if (isLoading) {
  //     return (
  //       <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-[rgba(255,255,255,.2)] text-2xl">
  //         <Loader size="30px" className="animate-spin" />
  //         Loading TeamSync...
  //       </div>
  //     );
  //   }
  //user ? <Outlet /> : <Navigate to="/" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
