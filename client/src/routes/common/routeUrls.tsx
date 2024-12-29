import GoogleOAuthFailure from "@/page/auth/GoogleOAuthFailure";
import SignIn from "@/page/auth/Sign-in";
import SignUp from "@/page/auth/Sign-up";
import WorkspaceDashboard from "@/page/workspace/Dashboard";
import Members from "@/page/workspace/Members";
import ProjectDetails from "@/page/workspace/ProjectDetails";
import Settings from "@/page/workspace/Settings";
import Tasks from "@/page/workspace/Tasks";

const authenticationRoutePaths = [
  { path: "/", element: <SignIn /> },
  { path: "/sign-up", element: <SignUp /> },
  { path: "/google/oauth/callback", element: <GoogleOAuthFailure /> },
];
export { authenticationRoutePaths };

const protectedRoutePaths = [
  { path: "/workspace/:workspaceId", element: <WorkspaceDashboard /> },
  { path: "/workspace/:workspaceId/tasks", element: <Tasks /> },
  { path: "/workspace/:workspaceId/members", element: <Members /> },
  { path: "/workspace/:workspaceId/settings", element: <Settings /> },
  {
    path: "/workspace/:workspaceId/project/:projectId",
    element: <ProjectDetails />,
  },
];
export { protectedRoutePaths };
