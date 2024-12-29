import { Edit3 } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import EditProjectForm from "./edit-project-form";

const EditProjectDialog = () => {
  return (
    <div>
      <Dialog modal={true}>
        <DialogTrigger className="mt-1.5" asChild>
          <button>
            <Edit3 className="w-5 h-5" />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg border-0">
          <EditProjectForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditProjectDialog;
