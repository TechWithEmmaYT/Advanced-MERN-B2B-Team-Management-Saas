import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyIcon } from "lucide-react";

const InviteMember = () => {
  return (
    <div className="flex flex-col pt-0.5 px-0 ">
      <h5 className="text-lg  leading-[30px] font-semibold mb-1">
        Invite members to join you
      </h5>
      <p className="text-sm text-muted-foreground leading-tight">
        Anyone with an invite link can join this free Workspace. You can also
        disable and create a new invite link for this Workspace at any time.
      </p>

      <div className="flex py-3 gap-2">
        <Label htmlFor="link" className="sr-only">
          Link
        </Label>
        <Input
          id="link"
          disabled={true}
          className="disabled:opacity-100 disabled:pointer-events-none"
          value="http://example.com/link/to/document"
          readOnly
        />
        <Button className="shrink-0" size="icon">
          <CopyIcon />
        </Button>
      </div>
    </div>
  );
};

export default InviteMember;
