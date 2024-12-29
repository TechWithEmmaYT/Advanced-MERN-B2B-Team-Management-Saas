import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import InviteMember from "@/components/workspace/member/invite-member";
import AllMembers from "@/components/workspace/member/all-members";

export default function Members() {
  return (
    <div className="w-full h-auto pt-2">
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
        <div className="w-full max-w-3xl mx-auto pt-3">
          <div>
            <h2 className="text-lg leading-[30px] font-semibold mb-1">
              Workspace members (1)
            </h2>
            <p className="text-sm text-muted-foreground">
              Workspace members can view and join all Workspace visible boards
              and create new boards in the Workspace.
            </p>
          </div>
          <Separator className="my-4" />

          <InviteMember />
          <Separator className="my-4 !h-[0.5px]" />

          <AllMembers />
        </div>
      </main>
    </div>
  );
}
