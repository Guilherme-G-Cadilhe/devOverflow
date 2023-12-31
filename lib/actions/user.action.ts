"use server";

import User, { IUser } from "@/database/user.model";
import { FilterQuery } from "mongoose";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  GetUserStatsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import Answer from "@/database/answer.model";
import { BadgeCriteriaType } from "@/types";
import { assignBadges } from "../utils";

export async function getUserByClerkId(params: GetUserByIdParams): Promise<IUser> {
  try {
    await connectToDatabase();
    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.log("error  getUserById:>> ", error);
    throw error;
  }
}

export async function getUserInfo(params: GetUserByIdParams) {
  try {
    await connectToDatabase();
    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });
    if (!user) throw new Error("User not found");

    const totalQuestions = await Question.countDocuments({ author: user._id });
    const totalAnswers = await Answer.countDocuments({ author: user._id });

    const [questionUpvotes] = await Question.aggregate([
      { $match: { author: user._id } },
      { $project: { _id: 0, upvotes: { $size: "$upvotes" } } },
      { $group: { _id: null, totalUpvotes: { $sum: "$upvotes" } } },
    ]);
    const [answerUpvotes] = await Answer.aggregate([
      { $match: { author: user._id } },
      { $project: { _id: 0, upvotes: { $size: "$upvotes" } } },
      { $group: { _id: null, totalUpvotes: { $sum: "$upvotes" } } },
    ]);
    const [questionViews] = await Question.aggregate([
      { $match: { author: user._id } },
      { $group: { _id: null, totalViews: { $sum: "$views" } } },
    ]);

    const criteria = [
      { type: "QUESTION_COUNT" as BadgeCriteriaType, count: totalQuestions },
      { type: "ANSWER_COUNT" as BadgeCriteriaType, count: totalAnswers },
      { type: "QUESTION_UPVOTES" as BadgeCriteriaType, count: questionUpvotes?.totalUpvotes || 0 },
      { type: "ANSWER_UPVOTES" as BadgeCriteriaType, count: answerUpvotes?.totalUpvotes || 0 },
      { type: "TOTAL_VIEWS" as BadgeCriteriaType, count: questionViews?.totalViews || 0 },
    ];
    const badgeCounts = assignBadges({ criteria });

    return { user, totalQuestions, totalAnswers, badgeCounts };
  } catch (error) {
    console.log("error  getUserInfo:>> ", error);
    throw error;
  }
}
export async function getAllUsers(params: GetAllUsersParams) {
  try {
    await connectToDatabase();

    const { searchQuery, filter, page = 1, pageSize = 10 } = params;
    const query: FilterQuery<typeof Question> = {};

    const skipAmount = (page - 1) * pageSize;

    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, "i") } },
        { username: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    let sortOptions = {};
    switch (filter) {
      case "old_users":
        sortOptions = { joinedAt: 1 };
        break;
      case "new_users":
        sortOptions = { joinedAt: -1 };
        break;
      case "top_contributors":
        sortOptions = { reputation: -1 };
        break;

      default:
        break;
    }
    // const { page = 1, pageSize = 20, filter, searchQuery } = params;

    const users: IUser[] = await User.find(query).sort(sortOptions).skip(skipAmount).limit(pageSize);

    const totalUsers = await User.countDocuments(query);
    const isNext = totalUsers > skipAmount + users.length;

    return { users, isNext };
  } catch (error) {
    console.log("error  getAllUsers:>> ", error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    await connectToDatabase();

    const newUser: IUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.log("error  createUser:>> ", error);
    throw error;
  }
}
export async function updateUser(params: UpdateUserParams) {
  try {
    await connectToDatabase();

    const { clerkId, updateData, path } = params;

    await User.findOneAndUpdate(
      {
        clerkId,
      },
      updateData,
      {
        new: true,
      }
    );
    revalidatePath(path);
  } catch (error) {
    console.log("error  updateUser:>> ", error);
    throw error;
  }
}
export async function deleteUser(params: DeleteUserParams) {
  try {
    await connectToDatabase();

    const { clerkId } = params;
    const user = await User.findOne({ clerkId });

    if (!user) throw new Error("User not found");

    // TODO: Delete user from DB, then delete questions, answers, comments, etc
    // const userQuestionsIds = await Question.find({ author: user._id }).distinct("_id");
    await Question.deleteMany({ author: user._id });

    const deletedUser = await User.findByIdAndDelete(user._id);
    return deletedUser;
  } catch (error) {
    console.log("error  deleteUser:>> ", error);
    throw error;
  }
}

export async function ToggleSaveQuestion(params: ToggleSaveQuestionParams) {
  try {
    await connectToDatabase();
    const { userId, questionId, path } = params;

    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    let updateQuery = {};

    if (user.saved.includes(questionId)) {
      updateQuery = { $pull: { saved: questionId } };
    } else {
      updateQuery = {
        $addToSet: { saved: questionId },
      };
    }

    const savedQuestion = await User.findByIdAndUpdate(userId, updateQuery, { new: true });
    if (!savedQuestion) {
      throw new Error("Couldnt save Question");
    }

    revalidatePath(path);
  } catch (error) {
    console.log("error  ToggleSaveQuestion:>> ", error);
    throw error;
  }
}
export async function getSavedQuestions(params: GetSavedQuestionsParams) {
  try {
    await connectToDatabase();

    const { clerkId, searchQuery, filter, page = 1, pageSize = 10 } = params;

    const query: FilterQuery<typeof User> = searchQuery ? { title: { $regex: new RegExp(searchQuery, "i") } } : {};

    const skipAmount = (page - 1) * pageSize;

    let sortOptions = {};
    switch (filter) {
      case "most_recent":
        sortOptions = { createdAt: -1 };
        break;
      case "oldest":
        sortOptions = { createdAt: 1 };
        break;
      case "most_voted":
        sortOptions = { upvotes: -1 };
        break;
      case "most_viewed":
        sortOptions = { views: -1 };
        break;
      case "most_answered":
        sortOptions = { answers: -1 };
        break;

      default:
        break;
    }

    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      match: query,
      model: Question,
      options: {
        sort: sortOptions,
        skip: skipAmount,
        limit: pageSize,
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });
    if (!user) throw new Error("User not found");

    const savedQuestionsCount = await User.aggregate([
      { $match: { clerkId } },
      { $project: { savedQuestionsCount: { $size: "$saved" } } },
    ]);
    const totalSaved = savedQuestionsCount[0]?.savedQuestionsCount || 0;
    const savedQuestions = user.saved;

    const isNext = totalSaved > skipAmount + savedQuestions.length;
    return { questions: savedQuestions, isNext };
  } catch (error) {
    console.log("error  GetSavedQuestions:>> ", error);
    throw error;
  }
}
export async function getUserQuestions(params: GetUserStatsParams) {
  try {
    await connectToDatabase();

    const { userId, page = 1, pageSize = 10 } = params;
    const skipAmount = (page - 1) * pageSize;

    const totalQuestions = await Question.countDocuments({ author: userId });
    const userQuestions = await Question.find({ author: userId })
      .sort({ createdAt: -1, views: -1, upvotes: -1 })
      .skip(skipAmount)
      .limit(pageSize)
      .populate("tags", "_id name")
      .populate("author", "_id clerkId name picture");

    const isNext = totalQuestions > skipAmount + userQuestions.length;
    return { totalQuestions, questions: userQuestions, isNext };
  } catch (error) {
    console.log("error  getUserQuestions:>> ", error);
    throw error;
  }
}

export async function getUserAnswers(params: GetUserStatsParams) {
  try {
    await connectToDatabase();

    const { userId, page = 1, pageSize = 10 } = params;
    const skipAmount = (page - 1) * pageSize;

    const totalAnswers = await Answer.countDocuments({ author: userId });
    const userAnswers = await Answer.find({ author: userId })
      .sort({ upvotes: -1 })
      .populate("question", "_id title")
      .populate("author", "_id clerkId name picture")
      .skip(skipAmount)
      .limit(pageSize);

    const isNext = totalAnswers > skipAmount + userAnswers.length;
    return { totalAnswers, answers: userAnswers, isNext };
  } catch (error) {
    console.log("error  getuserAnswers:>> ", error);
    throw error;
  }
}
