import InviteForm from "@/components/forms/invite";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BookUser, Plus } from "lucide-react";

const page = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div className="flex justify-start gap-3">
          <BookUser />
          <h1 className="font-medium">Team Members</h1>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <Plus />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="mb-4">Members</SheetTitle>
              <SheetDescription asChild>
                <InviteForm />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default page;
