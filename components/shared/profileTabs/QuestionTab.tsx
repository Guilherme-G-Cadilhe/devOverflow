import QuestionCard from "@/components/cards/QuestionCard";
import { getUserQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import Pagination from "../Pagination";

interface QuestionTabProps extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const QuestionsTab = async ({ searchParams, userId, clerkId }: QuestionTabProps) => {
  const result = await getUserQuestions({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
    pageSize: searchParams.pageSize ? +searchParams.pageSize : 5,
  });

  return (
    <>
      {result.questions.map((question) => (
        <QuestionCard
          key={question._id}
          _id={question._id}
          clerkId={clerkId}
          title={question.title}
          tags={question.tags}
          author={question.author}
          createdAt={question.createdAt}
          upvotes={question.upvotes}
          answers={question.answers}
          views={question.views}
        />
      ))}
      <Pagination pageNumber={searchParams?.page ? +searchParams.page : 1} isNext={result?.isNext} />
    </>
  );
};

export default QuestionsTab;
