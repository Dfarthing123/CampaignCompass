"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

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

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded shadow-sm text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Address</th>
                <th className="px-4 py-2 border">Affiliation</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Info</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{task.Address}</td>
                  <td className="px-4 py-2 border">{task.Affiliation}</td>

                  <td className="px-4 py-2 border">
                    {task.Date instanceof Object && "seconds" in task.Date
                      ? new Date(task.Date.seconds * 1000).toLocaleDateString()
                      : task.Date}
                  </td>
                  <td className="px-4 py-2 border">
                    {typeof task.Info === "object"
                      ? JSON.stringify(task.Info)
                      : task.Info}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TaskListPage;
