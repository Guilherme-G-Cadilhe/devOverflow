import Answer from "@/components/forms/Answer";
import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/renderTag/RenderTag";
import { getQuestionById } from "@/lib/actions/question.action";
import { formatNumberWithExtension, getTimesamp } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const QuestionDetails = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string };
}) => {
  const { id } = params;
  console.log("searchParams :>> ", searchParams);
  const result = await getQuestionById({ questionId: id });
  console.log("result :>> ", result);
  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link className="flex items-center justify-start gap-1" href={`/profile/${result.author.clerkId}`}>
            <Image className="rounded-full" src={result.author.picture} alt="profile" width={23} height={23} />
            <p className="paragraph-semibold text-dark300_light700">{result.author.name}</p>
          </Link>
          <div className="flex justify-end">VOTING</div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">{result.title}</h2>
      </div>
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          href=""
          alt="Clock Icon"
          value={`Asked ${getTimesamp(result.createdAt)}`}
          title=""
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          href=""
          alt="Message"
          value={formatNumberWithExtension(result.answers.length)}
          title="Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          href=""
          alt="Eye"
          value={formatNumberWithExtension(result.views)}
          title="Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>

      <ParseHTML data={result.content} />
      <div className="mt-8 flex flex-wrap gap-2">
        {result.tags.map((tag: any) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} showCount={false} />
        ))}
      </div>

      <Answer />
    </>
  );
};

export default QuestionDetails;
