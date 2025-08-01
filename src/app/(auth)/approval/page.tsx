"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
//import { useAuth } from "@/context/auth-context";
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
//import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  question_1: z.string().min(10, { message: "Please provide a full answer." }),
  question_2: z.string().min(10, { message: "Please provide a full answer." }),
  question_3: z.string().min(10, { message: "Please provide a full answer." }),
});

const ApprovalPage = () => {
  const router = useRouter();
  //const {  } = useAuth();

  const form = useForm<ApprovalFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question_1: "",
      question_2: "",
      question_3: "",
    },
  });

  const onSubmit = async (values: ApprovalFormValues) => {};

  return (
    <Card className="w-full max-w-sm animate-in fade-in-90 mt-5">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">
          Welcome UserName
        </CardTitle>
        <CardDescription>
          Thank you for registering as a volunteer! As part of our screening
          process, please take a moment to answer the following questions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="question_1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {" "}
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
            <FormField
              control={form.control}
              name="question_2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Have you volunteered for a political campaign before? If so,
                    what did you do?
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
            <FormField
              control={form.control}
              name="question_3"
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
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Submitting answers.." : "Submit"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground"></p>
      </CardFooter>
    </Card>
  );
};

export default ApprovalPage;
