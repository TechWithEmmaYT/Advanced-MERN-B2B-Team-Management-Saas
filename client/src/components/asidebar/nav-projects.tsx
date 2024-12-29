import { Folder, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import useWorkspaceId from "@/hooks/use-workspace-id";
import useCreateProjectDialog from "@/hooks/use-create-project-dialog";

export function NavProjects() {
  const navigate = useNavigate();
  const location = useLocation();
  const { onOpen } = useCreateProjectDialog();

  const workspaceId = useWorkspaceId();

  const { isMobile } = useSidebar();

  const pathname = location.pathname;

  const projects = [
    {
      id: "pro-383dh",
      name: "Design Engineering",
      emoji: "📊",
      url: `/workspace/${workspaceId}/project/:pro-383dh`,
    },
    {
      id: "p383dh",
      name: "Sales & Marketing",
      emoji: "📈",
      url: `/workspace/${workspaceId}/project/:p383dh`,
    },
    {
      id: "pro-wwhe",
      name: "Travel",
      emoji: "✈️",
      url: `/workspace/${workspaceId}/project/:pro-wwhe`,
    },
  ];

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="w-full justify-between pr-0">
        <span>Projects</span>
        <button
          onClick={onOpen}
          className="flex size-5 items-center justify-center rounded-full border"
        >
          <Plus className="size-3.5" />
        </button>
      </SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton asChild isActive={item.url === pathname}>
              <Link to={item.url}>
                {item.emoji}
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem onClick={() => navigate(`${item.url}`)}>
                  <Folder className="text-muted-foreground" />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className="text-muted-foreground" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontal className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
