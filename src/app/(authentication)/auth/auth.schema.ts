import { z } from "zod";


export const formSchema = z.object({
   email: z.string().email().min(2, { message: "Email is required" }),
})

export type FormSchema = z.infer<typeof formSchema>;