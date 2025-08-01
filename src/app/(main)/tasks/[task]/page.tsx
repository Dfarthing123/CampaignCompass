import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ClipboardCheck, Plus } from "lucide-react";

const page = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div className="flex justify-start gap-3">
          <ClipboardCheck />
          <h1 className="font-medium">Task</h1>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <Plus />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="mb-4">Task</SheetTitle>
              <SheetDescription asChild>
                <div>
                  <p className="text-center text-muted-foreground text-sm">
                    Fields
                  </p>
                  <p className="text-center font-medium text-primary mt-1 break-all"></p>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div></div>
    </div>
  );
};

export default page;
