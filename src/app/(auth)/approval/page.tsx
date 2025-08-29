"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/context/auth-context";
import type { ApprovalFormValues } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { PartyPopper, Smartphone } from "lucide-react";
import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { colors } from "@/utils/colours";
import { animals } from "@/utils/animals";
import { Slider } from "@/components/ui/slider";
import { checkUsernameExists } from "@/utils/checkUsernameExists";

const formSchema = z.object({
  Question1: z
    .string()
    .min(50, "Answers must be at least 50 characters")
    .max(150, "Answers must be at most 150 characters"),
  Question2: z
    .string()
    .min(50, "Answers must be at least 50 characters")
    .max(150, "Answers must be at most 150 characters"),
  Question3: z
    .string()
    .min(50, "Answers must be at least 50 characters")
    .max(150, "Answers must be at most 150 characters"),
});

interface ScreeningQuestions {
  Question1: string;
  Question2: string;
  Question3: string;
}

const formatNumber = (num: string): string => {
  if (Number(num) < 10) {
    return "00" + num;
  } else if (Number(num) < 100) {
    return "0" + num;
  } else {
    return num;
  }
};

const ApprovalPage = () => {
  const { selectedCampaignId, user } = useAuth();
  const [visible, setVisible] = useState<boolean>(false);
  const [screeningQuestions, setScreeningQuestions] =
    useState<ScreeningQuestions | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  // Generate username
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedAnimal, setSelectedAnimal] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const generateUsername = async () => {
    if (!selectedColor || !selectedAnimal) {
      alert("Please select both a color and an animal.");
      return;
    }
    const newUsername = `${selectedColor}_${selectedAnimal}_${number}`;

    // check db if exists?
    const result = await checkUsernameExists(newUsername);

    //
    if (!result) {
      setUsername(newUsername);
    } else {
      setUsername("Unavailable");
    }
  };

  // Fetch screening questions
  useEffect(() => {
    const fetchQuestions = async () => {
      if (!user || !selectedCampaignId) return;

      try {
        //load screening questions for this campaign
        const docSnap = await getDoc(
          doc(db, "campaignScreening", selectedCampaignId)
        );

        // Check if user already submitted
        const responseSnap = await getDoc(
          doc(
            db,
            "campaignScreeningResponses",
            `${user.uid}-${selectedCampaignId}`
          )
        );
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

  const [step, setStep] = useState(0);
  const steps = ["Q1", "Q2", "Q3", "Username"];

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const form = useForm<ApprovalFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Question1: "",
      Question2: "",
      Question3: "",
    },
  });

  const {
    formState: { errors },
  } = form;

  const onSubmit = async (answers: ApprovalFormValues) => {
    if (!user || !selectedCampaignId) return;

    setSubmitting(true);

    // get user record
    const usersRef = collection(db, "campaignUsers");
    const q = query(usersRef, where("email", "==", user?.email));
    const querySnapshot = await getDocs(q);

    // update username
    try {
      await updateDoc(doc(db, "campaignUsers", querySnapshot.docs[0].id), {
        username: username,
      });
    } catch (error) {
      console.error("Failed to set username:", error);
    }

    // set screening answers
    try {
      await setDoc(
        doc(
          db,
          "campaignScreeningResponses",
          `${user.uid}-${selectedCampaignId}`
        ),
        {
          userId: user.uid,
          campaignId: selectedCampaignId,
          answers,
          createdAt: serverTimestamp(),
        }
      );
      //window.location.reload();
    } catch (error) {
      console.error("Failed to submit responses:", error);
    } finally {
      setSubmitting(false);
      setVisible(!visible);
    }
  };

  if (!screeningQuestions) return <div>Loading screening questions...</div>;

  if (alreadySubmitted) {
    return (
      <div className="max-w-xl mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-2">Thank you!</h1>
        <p>
          We’ve got everything we need. A campaign admin will review your
          membership soon, and you’ll get an email once it’s approved.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm animate-in fade-in-90 mt-5 relative z-0">
      <p className="text-neutral-900">
        <span className="font-bold">Welcome</span> {user && user.email}. As part
        of our screening process, please take a moment to answer the following
        questions.
      </p>
      <Card className="mt-5">
        <CardHeader>
          {step === 0 && <p>Question 1</p>}
          {step === 1 && <p>Question 2</p>}
          {step === 2 && <p>Question 3</p>}
          {step === 3 && <p>Finally, let's generate your username</p>}
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {step === 0 && (
                <FormField
                  control={form.control}
                  name="Question1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{screeningQuestions.Question1}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please enter your answer"
                          rows={10}
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {step === 1 && (
                <FormField
                  control={form.control}
                  name="Question2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{screeningQuestions.Question2}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please enter your answer"
                          rows={10}
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {step === 2 && (
                <FormField
                  control={form.control}
                  name="Question3"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{screeningQuestions.Question3}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please enter your answer"
                          rows={10}
                          {...field}
                          required
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Choose a color
                    </label>
                    <select
                      className="w-full border p-2 rounded-xl mt-1"
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                    >
                      <option value="">Select color</option>
                      {colors.map((color) => (
                        <option key={color}>{color}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Choose an animal
                    </label>
                    <select
                      className="w-full border p-2 rounded-xl mt-1"
                      value={selectedAnimal}
                      onChange={(e) => setSelectedAnimal(e.target.value)}
                    >
                      <option value="">Select animal</option>
                      {animals.map((animal) => (
                        <option key={animal}>{animal}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Select a number
                    </label>
                    <Slider
                      className="my-5"
                      defaultValue={[1]}
                      min={1}
                      max={999}
                      step={1}
                      onValueChange={(v) =>
                        setNumber(formatNumber(v.toString()))
                      }
                    ></Slider>
                    <input
                      type="text"
                      disabled
                      placeholder="e.g., 42"
                      className="w-full border p-2 rounded-xl mt-1"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                    />
                  </div>

                  <Button
                    type="button"
                    className="w-full"
                    onClick={generateUsername}
                  >
                    Generate
                  </Button>

                  {username && (
                    <div className="flex flex-col items-center gap-4 ">
                      <p className="font-bold">
                        {username === "Unavailable"
                          ? "Username already exists. Please try again."
                          : username}
                      </p>
                    </div>
                  )}

                  <div className="text-sm text-destructive">
                    {errors.Question1 && <p>Please complete question 1</p>}
                    {errors.Question2 && <p>Please complete question 2</p>}
                    {errors.Question3 && <p>Please complete question 3</p>}
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-4 w-full">
                <Button type="button" onClick={back} disabled={step === 0}>
                  Back
                </Button>

                {step < steps.length - 1 ? (
                  <Button type="button" onClick={next}>
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={
                      username === "" ||
                      username ===
                        "Username already exists. Please try again." ||
                      Object.keys(errors).length > 0
                    }
                  >
                    {submitting ? "Submitting..." : "Submit"}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
        <div
          className={`${
            visible ? "block" : "hidden"
          } bg-white p-4 w-full h-full rounded-xl absolute top-0 left-0 z-10 flex flex-col gap-10`}
        >
          <div className="flex flex-row items-center justify-center gap-2 mt-5">
            <PartyPopper size={32} />
            <p className="font-medium text-2xl">All done</p>
          </div>
          <div className="flex flex-col gap-2">
            <p>
              Thanks for submitting your answers! We’re reviewing them now. Once
              approved, you’ll receive a confirmation email.
            </p>
            <p>
              Get a head start: Download our mobile app below and be ready to
              dive into your first tasks!
            </p>
          </div>

          <Button className="w-full">
            <Smartphone />
            <p>Android Google Play Store</p>
          </Button>

          <Button className="w-full">
            <Smartphone />
            <p>Apple iOS app store</p>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ApprovalPage;
