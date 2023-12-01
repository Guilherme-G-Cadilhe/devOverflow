"use server";

import { connectToDatabase } from "../mongoose";
import { SearchParams } from "./shared.types";
import Question from "@/database/question.model";
import Answer from "@/database/answer.model";
import User from "@/database/user.model";
import Tag from "@/database/tag.model";

const SearchableTypes = ["question", "answer", "user", "tag"];

export async function findGlobalSearch(params: SearchParams) {
  try {
    await connectToDatabase();
    const { query, type } = params;
    const regexQuery = { $regex: query, $options: "i" };

    let results: any[] = [];

    const modelsAndTypes = [
      { model: Question, searchField: "title", type: "question" },
      { model: User, searchField: "name", type: "user" },
      { model: Answer, searchField: "content", type: "answer" },
      { model: Tag, searchField: "name", type: "tag" },
    ];
    const typeLowerCase = type?.toLowerCase();

    if (!typeLowerCase || !SearchableTypes.includes(typeLowerCase)) {
      for (const { model, searchField, type } of modelsAndTypes) {
        const queryResults = await model.find({ [searchField]: regexQuery }).limit(2);

        results.push(
          ...queryResults.map((result) => ({
            title: type === "answer" ? `Answers containing "${query}"` : result[searchField],
            type,
            id: type === "user" ? result.clerkId : type === "answer" ? result.question : result._id,
          }))
        );
      }
    } else {
      const modelInfo = modelsAndTypes.find((modelAndType) => modelAndType.type === typeLowerCase);
      if (!modelInfo) throw new Error("invalid search type");

      const queryResults = await modelInfo.model.find({ [modelInfo.searchField]: regexQuery }).limit(8);
      results = queryResults.map((result) => ({
        title: type === "answer" ? `Answers containing "${query}"` : result[modelInfo.searchField],
        type,
        id: type === "user" ? result.clerkId : type === "answer" ? result.question : result._id,
      }));
    }

    return JSON.stringify(results);
  } catch (error) {
    console.log("error fetching global results :>> ", error);
    throw error;
  }
}
