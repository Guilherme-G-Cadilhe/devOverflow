import * as z from "zod";

export const CreateQuestionSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "Title must be at least 5 characters.",
    })
    .max(100, {
      message: "Title must be less than 100 characters.",
    }),
  explanation: z.string().min(100, {
    message: "Explanation must be at least 100 characters.",
  }),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3, { message: "Maximum amount of Tags allowed is 3" }),
});

export const AnswerSchema = z.object({
  answer: z.string().min(100),
});
