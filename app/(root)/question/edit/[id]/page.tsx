import QuestionForm from "@/components/forms/Question";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserByClerkId } from "@/lib/actions/user.action";
import { ParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";

const EditQuestion = async ({ params }: ParamsProps) => {
  const { id } = params;
  const { userId: clerkId } = auth();
  if (!clerkId) return null;

  const mongoUser = await getUserByClerkId({ userId: clerkId });
  if (!mongoUser) return null;
  const result = await getQuestionById({ questionId: id });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Question</h1>
      <div className="mt-9">
        <QuestionForm
          type="edit"
          mongoUserId={JSON.stringify(mongoUser._id)}
          questionDetails={JSON.stringify(result)}
        />
      </div>
    </>
  );
};

export default EditQuestion;
