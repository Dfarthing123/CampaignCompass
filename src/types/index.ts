import * as z from 'zod';

const authFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type AuthFormValues = z.infer<typeof authFormSchema>;
