"use client";

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
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold text-xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4">Screening Questions</h2>

        {questions && answers ? (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {questionKeys.map((key) => (
              <div key={key} className="border-b pb-2">
                <p className="font-semibold">{questions[key]}</p>
                <p className="text-gray-700">{answers[key] || "-"}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No screening questions submitted.</p>
        )}

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}