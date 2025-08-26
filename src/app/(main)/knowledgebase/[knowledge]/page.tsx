"use client";

import MarkdownEditor, {
  MarkdownEditorHandle,
} from "@/components/MarkdownEditor";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Brain } from "lucide-react";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import hardenReactMarkdown from "harden-react-markdown";
import ReactMarkdown from "react-markdown";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";

const HardenedMarkdown = hardenReactMarkdown(ReactMarkdown);

const page = () => {
  const { user, role } = useAuth();
  const [title, setTitle] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [unsavedMarkdown, setUnsavedMarkdown] = useState("");

  const editorRef = useRef<MarkdownEditorHandle>(null);

  const [loading, setLoading] = useState(true);

  const knowledgeItemId = window.location.href.split("/")[4];

  useEffect(() => {
    const fetchKnowledgebaseItem = async () => {
      try {
        const ref = doc(db, "KnowledgeBase", knowledgeItemId);
        const snapshot = await getDoc(ref);

        if (snapshot.exists()) {
          const knowledgeItemContent = JSON.parse(snapshot.data().data);

          setTitle(knowledgeItemContent.title);

          setMarkdown(knowledgeItemContent.markdown);
        } else {
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching knowledge item:", error);
        setLoading(false);
      }
    };

    fetchKnowledgebaseItem();
  }, [knowledgeItemId, loading]);

  const handleSave = async () => {
    const currentMarkdown = editorRef.current?.getValue() ?? "";

    try {
      // Save to existing Firestore document
      await setDoc(
        doc(db, "KnowledgeBase", knowledgeItemId),
        {
          data: JSON.stringify({
            title: title,
            markdown: currentMarkdown,
          }),
          updatedAt: new Date(),
        },
        { merge: true }
      );

      alert("Markdown saved to existing doc!");
    } catch (error) {
      console.error("Error saving:", error);
      alert("Error saving to Firebase.");
    }
  };

  return (
    <div>
      <div className="flex flex-row justify-start gap-2 items-center mb-5">
        <Brain />
        <p className="font-medium text-lg">{title}</p>
      </div>

      {role != "admin" ? (
        <div className="markdown-preview bg-neutral-50 border rounded-lg p-2">
          <HardenedMarkdown
          //defaultOrigin="https://yourdomain.com"
          // allowedLinkPrefixes={[
          //   "https://github.com/",
          //   "https://yourdomain.com/docs/",
          // ]}
          //allowedImagePrefixes={["https://via.placeholder.com/", "/images/"]}
          >
            {markdown}
          </HardenedMarkdown>
        </div>
      ) : (
        <div>
          <MarkdownEditor ref={editorRef} value={markdown} />
          <Button onClick={handleSave}>Save</Button>
        </div>
      )}
    </div>
  );
};

export default page;
