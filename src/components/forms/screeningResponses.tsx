"use client";

import { X } from "lucide-react";
import { Button } from "../ui/button";

interface ScreeningModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: { [key: string]: string } | null;
  answers: { [key: string]: string } | null;
}

export default function ScreeningModal({
  isOpen,
  onClose,
  questions,
  answers,
}: ScreeningModalProps) {
  if (!isOpen) return null;

  // Only include keys that exist in questions
  const questionKeys = questions ? Object.keys(questions) : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-lg relative">
        {/* <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold text-xl"
        >
          <X />
        </button> */}

        <p className="text-xl font-medium mb-5">Screening answers</p>

        {questions && answers ? (
          <ol className="max-h-96 overflow-y-auto">
            {questionKeys.map((key) => (
              <li key={key}>
                <p className="mb-5">{questions[key]}</p>
                <p className="font-medium">{answers[key] || "-"}</p>
                <hr className="my-5" />
              </li>
            ))}
          </ol>
        ) : (
          <p className="font-medium p-3"> Awaiting screening answers.</p>
        )}

        <div className="text-right">
          <Button variant="outline" onClick={onClose} size="sm">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
