"use client";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Input } from "@/components/ui/input";

import type { InviteFormSchema } from "@/types";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

const auth = getAuth();

const actionCodeSettings = {
  // URL you want to redirect back to after the user clicks the email link.
  // This domain (campaigncompapp.web.app) must be in your Firebase Console's authorized domains.
  url: "https://campaign-compass-backend--campaigncompapp.europe-west4.hosted.app/approval?campaignId=someCampaign", // You can pass custom state like campaignId

  // This must be true for email link sign-in to work correctly.
  handleCodeInApp: true,

  //   // Optional: If you have iOS/Android versions of your app, configure them here.
  //   // Otherwise, Firebase will handle the link in the web browser.
  //   iOS: {
  //     bundleId: "com.yourcompany.yourapp.ios", // Replace with your actual iOS bundle ID
  //   },
  //   android: {
  //     packageName: "com.yourcompany.yourapp.android", // Replace with your actual Android package name
  //     installApp: true, // Set to true to install the app if not available
  //     minimumVersion: "12", // Optional: minimum version of your app
  //   },

  // Optional: Use a custom Firebase Hosting domain if you have one configured
  // and wish to use it for the email action links.
  // linkDomain: 'your-custom-domain.com' // e.g., 'auth.campaigncompapp.com' if you have one
};

function InviteForm() {
  const form = useForm<InviteFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: InviteFormSchema) => {
    try {
      await sendSignInLinkToEmail(auth, values.email, actionCodeSettings)
        .then(() => {
          // Save the email locally so you can retrieve it when the user returns to complete sign-in.
          window.localStorage.setItem("emailForSignIn", values.email);

          toast({
            variant: "default",
            title: "Invite Sent",
            description: "A sign-in link has been sent.",
            //error.message || "An unexpected error occurred. Please try again.",
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(
            `Error sending email sign-in link: ${errorCode} - ${errorMessage}`
          );
          // Display an error message to the user.
          alert(`Failed to send sign-in link: ${errorMessage}`);
        });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Invite Failed",
        description:
          error.message || "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <Card className="w-full max-w-sm animate-in fade-in-90">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Invite member</CardTitle>
        <CardDescription>Enter a valid email</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
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
              {form.formState.isSubmitting
                ? "Sending invite mail..."
                : "Send invite"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default InviteForm;
