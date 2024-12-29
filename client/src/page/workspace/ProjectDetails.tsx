import { Separator } from "@/components/ui/separator";
import EditProjectDialog from "@/components/workspace/project/edit-project-dialog";
import ProjectAnalytics from "@/components/workspace/project/project-analytics";
import CreateTaskDialog from "@/components/workspace/task/create-task-dialog";
import TaskTable from "@/components/workspace/task/task-table";
import { useParams } from "react-router-dom";

const ProjectDetails = () => {
  const param = useParams();
  const projectId = param.projectId;

  return (
    <div className="w-full space-y-6 py-4 md:pt-3">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center gap-2">
          <h2 className="flex items-center gap-3 text-xl font-medium truncate tracking-tight">
            <span>📊</span>
            Design Engineering
          </h2>
          <EditProjectDialog />
        </div>
        <CreateTaskDialog projectId={projectId} />
      </div>
      <div className="space-y-5">
        <ProjectAnalytics />
        <Separator />
        {/* {Task Table} */}
        <TaskTable />
      </div>
    </div>
  );
};

export default ProjectDetails;
