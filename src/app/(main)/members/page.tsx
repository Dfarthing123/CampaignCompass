import InviteForm from "@/components/forms/invite";
import { DataTable } from "./datatable";
import { columns, TeamMember } from "./columns";
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

const getData = async (): Promise<TeamMember[]> => {
  const users = Array.from({ length: 1 }, (_, i) => ({
    id: (i + 1).toString(),
    username: `NewtNavy${i + 1}`,
  }));

  return users;
};

const page = async () => {
  const data = await getData();
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
      <div className="container mx-auto bg-neutral-50 dark:bg-neutral-900">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default page;
