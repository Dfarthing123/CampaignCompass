"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/context/auth-context";
import type { ApprovalFormValues } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { UsernameGenerator } from "@/components/customavatar";
import { Apple, Hand, PartyPopper, Smartphone } from "lucide-react";

//import { toast } from "@/hooks/use-toast";

const formSchema = z.object({});

const ApprovalPage = () => {
  const router = useRouter();
  const { user, loading, role } = useAuth();

  const [step, setStep] = useState(0);

  const form = useForm<ApprovalFormValues>({
    //resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      questions: "",
    },
  });

  const steps = ["Welcome", "Personal Info", "Preferences", "Confirm"];

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (values: ApprovalFormValues) => {};

  const [visible, setVisible] = useState<boolean>(false);
  const finish = () => {
    console.log("ss");
    setVisible(!visible);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    if (name === "preferences") {
      // setFormData((prev) => ({
      //   ...prev,
      //   preferences: checked
      //     ? [...prev.preferences, value]
      //     : prev.preferences.filter((p) => p !== value),
      // }));
    } else {
      //setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <>
      <Card className="w-full max-w-sm animate-in fade-in-90 mt-5 relative z-0">
        <CardHeader>
          {/* <CardTitle className="text-2xl font-headline">
          Hi {role && role}
        </CardTitle> */}

          {step === 0 && (
            <p className="text-neutral-900">
              <span className="font-bold">Thank you</span> {user && user.email}{" "}
              for registering as a volunteer. As part of our screening process,
              please take a moment to answer the following questions.
            </p>
          )}
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {step === 0 && (
                <FormField
                  control={form.control}
                  name="questions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        What interests you about working on this campaign?
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us what drew you to this campaign specifically. Are there particular values, issues, or aspects of our candidate's message that resonate with you?"
                          rows={10}
                          {...field}
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
                  name="questions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Have you volunteered for a political campaign before? If
                        so, what did you do?
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="No experience is required! If you have volunteered before, let us know what kind of work you did (e.g., canvassing, phone, events)."
                          rows={10}
                          {...field}
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
                  name="questions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Are you comfortable talking to strangers about political
                        issues, either in person or over the phone?
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="It’s okay if you’re a little nervous we provide scripts and training. We’re looking for people who are open to learning and engaging respectfully."
                          rows={10}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {step === 3 && (
                <div>
                  <FormLabel>Generate your username and avatar</FormLabel>
                  <UsernameGenerator />
                </div>
              )}
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="flex justify-between pt-4 w-full">
            <Button onClick={back} disabled={step === 0} className="">
              Back
            </Button>

            {step < steps.length - 1 ? (
              <Button onClick={next} className="">
                Next
              </Button>
            ) : (
              <Button onClick={() => finish()} className="">
                Finish
              </Button>
            )}
          </div>
        </CardFooter>
        <div
          className={`${
            visible ? "block" : "hidden"
          } bg-white p-4 w-full h-full rounded-xl absolute top-0 left-0 z-10 flex flex-col gap-10`}
        >
          <div className="flex flex-row gap-2">
            <PartyPopper size={32} />
            <p className="font-medium text-lg">Thank you!</p>
          </div>
          <div className="flex flex-col gap-2">
            <p>
              We will review your answers shortly. Once approved, you'll receive
              a confirmation email.
            </p>
            <p>
              In the meantime, get ready for your first tasks by downloading the
              mobile app below:
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
    </>
  );
};

export default ApprovalPage;
