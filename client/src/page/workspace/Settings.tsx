import EditWorkspaceForm from "@/components/forms/edit-workspace-form";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import DeleteWorkspaceCard from "@/components/workspace/settings/delete-workspace-card";

const Settings = () => {
  return (
    <div className="w-full h-auto py-2">
      <div className="w-full max-w-3xl mx-auto pb-2">
        <div className="flex items-center gap-4">
          <Avatar className="size-[60px] rounded-lg font-bold text-[35px] ">
            <AvatarFallback className="rounded-lg bg-gradient-to-tl to-black  from-black text-white">
              AI
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left leading-tight">
            <span className="truncate font-semibold text-xl">Acme Inc</span>
            <span className="truncate text-sm">Free</span>
          </div>
        </div>
      </div>
      <Separator className="my-4 " />
      <main>
        <div className="w-full max-w-3xl mx-auto py-3">
          <h2 className="text-[20px] leading-[30px] font-semibold mb-3">
            Workspace settings
          </h2>

          <div className="flex flex-col pt-0.5 px-0 ">
            <div className="pt-2">
              <EditWorkspaceForm />
            </div>
            <div className="pt-2">
              <DeleteWorkspaceCard />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
