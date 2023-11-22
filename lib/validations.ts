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

export const ProfileEditSchema = z.object({
  name: z
    .string()
    .min(5, {
      message: "Name must be at least 5 characters.",
    })
    .max(50, {
      message: "Name must be less than 50 characters.",
    }),
  username: z
    .string()
    .min(5, {
      message: "username must be at least 5 characters.",
    })
    .max(50, {
      message: "username must be less than 50 characters.",
    }),
  portfolioWebsite: z.union([
    z.string().url({
      message: "Please provide valid URL",
    }),
    z.literal(""),
  ]),
  location: z
    .string()
    .min(2, {
      message: "location must be at least 2 characters.",
    })
    .max(50, {
      message: "location must be less than 50 characters.",
    }),
  // .regex(/^[a-zA-Z\s]*$/, "Location can only contain letters"),
  bio: z
    .string()
    .min(5, {
      message: "bio must be at least 5 characters.",
    })
    .max(150, {
      message: "bio must be less than 150 characters.",
    }),
});
