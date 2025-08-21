"use client";

import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Brain } from "lucide-react";
import React from "react";
import { useEffect, useState } from "react";

type KnowledgeItem = {
  id: string;
  title: string;
  data: string;
};

const page = () => {
  const [knowledgeItem, setKnowledgeItem] = useState<KnowledgeItem | null>();
  const [loading, setLoading] = useState(true);

  const knowledgeItemId = window.location.href.split("/")[4];

  useEffect(() => {
    const fetchKnowledgebaseItem = async () => {
      try {
        const ref = doc(db, "KnowledgeBase", knowledgeItemId);
        const snapshot = await getDoc(ref);

        if (snapshot.exists()) {
          const knowledgeItemContent = JSON.parse(snapshot.data().data);

          setKnowledgeItem({
            id: snapshot.id,
            title: knowledgeItemContent.title,
            data: knowledgeItemContent.sections[0].content,
          } as KnowledgeItem);
        } else {
          setKnowledgeItem(null);
        }
        console.log(knowledgeItem);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      }
    };

    fetchKnowledgebaseItem();
  }, [knowledgeItemId, loading]);

  return (
    <div>
      <div className="flex flex-row justify-start gap-2 items-center mb-5">
        <Brain />
        <p className="font-medium text-lg">{knowledgeItem?.title}</p>
      </div>
      <div>
        {knowledgeItem?.data.split("\n").map((line, index) => (
          <p key={index} className="mb-3">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};

export default page;
