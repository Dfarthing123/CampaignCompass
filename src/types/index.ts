import * as z from 'zod';

const authFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type AuthFormValues = z.infer<typeof authFormSchema>;

const inviteFormSchema = z.object({
  email: z.string(),
});

export type InviteFormSchema = z.infer<typeof inviteFormSchema>;


const approvalFormSchema = z.object({
    Question1: z.string(),
    Question2: z.string(),
    Question3: z.string(),
});

export type ApprovalFormValues = z.infer<typeof approvalFormSchema>;
