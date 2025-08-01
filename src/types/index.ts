import * as z from 'zod';

const authFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type AuthFormValues = z.infer<typeof authFormSchema>;



const approvalFormSchema = z.object({
  question_1: z.string(),
  question_2: z.string(),
   question_3: z.string(),
});

export type ApprovalFormValues = z.infer<typeof approvalFormSchema>;
