"use server";

import { connectToDatabase } from "../mongoose";
import Question from "@/database/question.model";
import { CreateAnswerParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import Answer from "@/database/answer.model";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();
    const { content, author, question, path } = params;

    const newAnswer = await Answer.create({
      content,
      question,
      author,
    });

    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });
    revalidatePath(path);
    return { newAnswer };
  } catch (error) {
    console.log("error createAnswer :>> ", error);
    throw error;
  }
}
