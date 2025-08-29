"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { columns } from "./columns";
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
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "@/lib/firebase";
import { useAuth } from "@/context/auth-context";





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
  const authUser = useAuth().user;
  const { selectedCampaignId } = useAuth();

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

  const handleGetTask = async () => {

      
      try {

        const functions = getFunctions(app,"us-central1");
        const createTask = httpsCallable(functions, "createTask");

        const result: any = await createTask({
          latitude: 33.3413708,
          longitude: -118.3290535,
          campaignId: selectedCampaignId

        });

        
      } catch (err: any) {
        console.error("Invite error:", err);
        
      } finally {
        console.log("Done");
      }
    };





  return (
    <div className="">
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

        <>
        <button onClick={handleGetTask}className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50">Get Task</button>


        <DataTable columns={columns} data={tasks} />
        </>
      )}
    </div>
  );
};

export default TaskListPage;
