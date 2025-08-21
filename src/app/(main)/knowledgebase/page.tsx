"use client";

import { db } from "@/lib/firebase";
import { getDocs, collection } from "firebase/firestore";
import { Brain } from "lucide-react";
import React, { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./datatable";

type KnowledgeItem = {
  id: string;
};

const page = () => {
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKnowledgebase = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "KnowledgeBase"));

        const knowledgeBaseData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...JSON.parse(doc.data().data),
        })) as KnowledgeItem[];
        setKnowledgeItems(knowledgeBaseData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      }
    };

    fetchKnowledgebase();
  }, []);

  return (
    <div className="">
      <div className="flex justify-between items-center mb-5">
        <div className="flex justify-start gap-3">
          <Brain />
          <h1 className="font-medium">Knowledge Base</h1>
        </div>
      </div>

      {knowledgeItems.length === 0 ? (
        <p>No knowledge items found.</p>
      ) : (
        <DataTable columns={columns} data={knowledgeItems} />
      )}
    </div>
  );
};

export default page;
