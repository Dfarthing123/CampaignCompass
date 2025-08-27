"use client";

import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { any } from "zod";

interface ScreeningQuestions {
  Question1: string;
  Question2: string;
  Question3: string;
}

interface ScreeningAnswers {
  Question1: string;
  Question2: string;
  Question3: string;
}

const ScreeningPage = () => {
  const { selectedCampaignId, user, loading, status } = useAuth();
  const router = useRouter();

  const [screeningQuestions, setScreeningQuestions] = useState<ScreeningQuestions | null>(null);
  const [answers, setAnswers] = useState<ScreeningAnswers>({
    Question1: "",
    Question2: "",
    Question3: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);



  // Redirect unauthenticated users
  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [user, loading, router]);

  // Fetch screening questions
  useEffect(() => {
    const fetchQuestions = async () => {
      if (!user || !selectedCampaignId) return;

      try {
        //load screening questions for this campaign
        const docSnap = await getDoc(doc(db, "campaignScreening", selectedCampaignId));

        // Check if user already submitted
        const responseSnap = await getDoc(doc(db, "campaignScreeningResponses", `${user.uid}-${selectedCampaignId}`));
        if (responseSnap.exists()) {
          setAlreadySubmitted(true);
        }


        if (docSnap.exists()) {
            setScreeningQuestions(docSnap.data() as ScreeningQuestions);
        } else {
            //questions not found try and load defaults
            const docSnap = await getDoc(doc(db, "campaignScreening", "DEFAULT"));

            if (docSnap.exists()) {
                setScreeningQuestions(docSnap.data() as ScreeningQuestions);
            } else {
                setScreeningQuestions(null);
            }
        }
      } catch (error) {
        console.error("Failed to fetch screening questions:", error);
      }
    };

    fetchQuestions();
  }, [selectedCampaignId]);

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAnswers((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || !selectedCampaignId) return;

    setSubmitting(true);

    try {


        await setDoc(doc(db, "campaignScreeningResponses", `${user.uid}-${selectedCampaignId}`), {
        userId: user.uid,
        campaignId: selectedCampaignId,
        answers,
        createdAt: serverTimestamp(),
        });

        
        window.location.reload();
    } catch (error) {
        console.error("Failed to submit responses:", error);
        
    } finally {
        setSubmitting(false);
    }
  };

  if (!screeningQuestions) return <div>Loading screening questions...</div>;

  if (alreadySubmitted) {
    return (
      <div className="max-w-xl mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-2">Thank you!</h1>
        <p>We have everything we need, a campaign admin will review and approve your membership shortly.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Screening Questions</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(screeningQuestions).map((key) => (
            <div key={key} className="mb-4">
                <label htmlFor={key} className="block font-medium mb-1">
                {screeningQuestions[key as keyof ScreeningQuestions]}
                </label>
                <textarea
                id={key}                        // ✅ added id
                name={key}
                value={answers[key as keyof ScreeningAnswers] || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={3}
                required
                />
            </div>
        ))}

        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ScreeningPage;
