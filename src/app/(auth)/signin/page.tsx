"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import type { AuthFormValues } from "@/types";
import { User } from "firebase/auth";
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
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { PartyPopper, TriangleAlert } from "lucide-react";
//import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

const SignInPage = () => {
  const router = useRouter();
  const { signIn, resendVerificationEmail } = useAuth();

  //
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [unverifiedUser, setUnverifiedUser] = useState<User | null>(null);

  const onSubmit = async (values: AuthFormValues) => {
    setError(null);
    setSuccess(null);
    setUnverifiedUser(null);

    try {
      await signIn(values);
      //console.log(user);
      router.push("/"); // ✅ Redirect to home after successful sign-in
    } catch (error: any) {
      console.log(error.code, error);
      if (error.code === "auth/email-not-verified") {
        setUnverifiedUser(error.user);
        setError(
          "Your email is not verified. Please check your inbox and click the link provided."
        );
        // toast({
        //   variant: "destructive",
        //   title: "Your email is not verified",
        //   description: "Please check your inbox.", // error.message || "Please check your inbox.",
        // });
      } else if (error.code === "auth/user-not-found") {
        setError("No user found with this email.");
      } else if (error.code === "auth/invalid-credential") {
        setError("Incorrect account details.");
      } else {
        setError(error.message || "An error occurred during sign-in.");
      }
    } finally {
      //
    }
  };

  const handleResendVerification = async () => {
    if (!unverifiedUser) return;
    try {
      await resendVerificationEmail(unverifiedUser);
      setSuccess(
        "Verification email resent. Please check your inbox and click the link provided."
      );
      setError(null);
    } catch (err: any) {
      setError("Failed to resend verification email.");
    }
  };

  return (
    <Card className="w-full max-w-sm animate-in fade-in-90">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Sign in</CardTitle>
        <CardDescription>Enter your account details.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm font-medium">
          {error && (
            <div className="text-destructive flex flex-row gap-3 mb-4">
              <TriangleAlert /> {error}
            </div>
          )}
          {success && (
            <div className="text-green-600 flex flex-row gap-3 mb-4">
              <PartyPopper /> {success}
            </div>
          )}
          {unverifiedUser && (
            <Button
              onClick={handleResendVerification}
              variant="outline"
              className="w-full mb-4"
              size="sm"
            >
              Resend Verification Email
            </Button>
          )}
        </div>
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
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
              {form.formState.isSubmitting ? "Signing in.." : "Sign in"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account? Contact your local representative to sign up.
          {/** 
          Don’t have an account?
          <Button variant="link" asChild className="p-0 h-auto ms-2">
            <Link href="/signup">Sign up</Link>
          </Button>
          */}
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignInPage;
