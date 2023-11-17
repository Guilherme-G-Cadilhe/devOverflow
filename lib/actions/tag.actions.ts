"use server";

import User from "@/database/user.model";
import Tag, { ITag } from "@/database/tag.model";
import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { GetAllTagsParams, GetQuestionsByTagIdParams, GetTopInteractedTagsParams } from "./shared.types";
import { FilterQuery } from "mongoose";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    await connectToDatabase();

    const { userId } = params;

    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    return [
      { _id: "1", name: "Tag 1" },
      { _id: "2", name: "Tag 2" },
      { _id: "3", name: "Tag 3" },
    ];
  } catch (error) {
    console.log("error  getTopInteractedTags:>> ", error);
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    await connectToDatabase();

    // const { page = 1, pageSize = 20, filter, searchQuery } = params;

    const tags = await Tag.find({}).sort({ createdAt: -1 });

    return { tags };
  } catch (error) {
    console.log("error  getAllTags:>> ", error);
    throw error;
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    await connectToDatabase();

    // const { tagId, page = 1, pageSize = 10, searchQuery } = params;
    const { tagId, searchQuery } = params;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };

    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      match: searchQuery ? { title: { $regex: searchQuery, $options: "i" } } : {},
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
      options: {
        sort: { createdAt: -1 },
      },
    });
    if (!tag) throw new Error("Tag not found");

    const questions = tag.questions;

    return { tagTitle: tag.name, questions };
  } catch (error) {
    console.log("error  getQuestionsByTagId:>> ", error);
    throw error;
  }
}
