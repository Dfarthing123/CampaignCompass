"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { columns, Task } from "./columns";
import { DataTable } from "./datatable";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Plus, ClipboardList } from "lucide-react";

type TaskItem = {
  id: string;
  Address: string;
  Affiliation: string;
  Date: Timestamp;
  Info: string | object; // Allow string or object for flexibility
};

const TaskListPage = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "TaskItem"));
        const tasksData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as TaskItem[];
        setTasks(tasksData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-5">
        <div className="flex justify-start gap-3">
          <ClipboardList />
          <h1 className="font-medium">Tasks</h1>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <Plus />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="mb-4">Tasks</SheetTitle>
              <SheetDescription asChild>
                <div>
                  <p className="text-center text-muted-foreground text-sm">
                    New task
                  </p>
                  <p className="text-center font-medium text-primary mt-1 break-all"></p>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        // <div className="overflow-x-auto">
        //   <table className="min-w-full border border-gray-300 rounded shadow-sm text-sm">
        //     <thead className="bg-gray-100">
        //       <tr>
        //         <th className="px-4 py-2 border">Address</th>
        //         <th className="px-4 py-2 border">Affiliation</th>
        //         <th className="px-4 py-2 border">Date</th>
        //         <th className="px-4 py-2 border">Info</th>
        //       </tr>
        //     </thead>
        //     <tbody>
        //       {tasks.map((task) => (
        //         <tr key={task.id} className="hover:bg-gray-50">
        //           <td className="px-4 py-2 border">{task.Address}</td>
        //           <td className="px-4 py-2 border">{task.Affiliation}</td>

        //           <td className="px-4 py-2 border">
        //             {task.Date instanceof Object && "seconds" in task.Date
        //               ? new Date(task.Date.seconds * 1000).toLocaleDateString()
        //               : task.Date}
        //           </td>
        //           <td className="px-4 py-2 border">
        //             {typeof task.Info === "object"
        //               ? JSON.stringify(task.Info)
        //               : task.Info}
        //           </td>
        //         </tr>
        //       ))}
        //     </tbody>
        //   </table>
        // </div>
        <DataTable columns={columns} data={tasks} />
      )}
    </div>
  );
};

export default TaskListPage;
