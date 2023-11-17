import Link from "next/link";
import RenderTag from "../shared/renderTag/RenderTag";
import Metric from "../shared/Metric";
import { formatNumberWithExtension, getTimestamp } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteActions from "../shared/EditDeleteActions";
interface QuestionCardTypes {
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    name: string;
    picture: string;
    clerkId: string;
  };
  createdAt: Date;
  upvotes: string[];
  views: number;
  answers: Array<object>;
  clerkId?: string | null;
}

function QuestionCard({ _id, clerkId, title, tags, author, createdAt, upvotes, answers, views }: QuestionCardTypes) {
  const showActionButtons = clerkId && clerkId === author.clerkId;

  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">{title}</h3>
          </Link>
        </div>

        <SignedIn>{showActionButtons && <EditDeleteActions type="Question" itemId={JSON.stringify(_id)} />}</SignedIn>
      </div>

      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          href={`/profile/${author._id}`}
          alt="User"
          value={author.name}
          title={` - asked ${getTimestamp(createdAt)}`}
          textStyles="body-medium text-dark400_light700"
          isAuthor
        />
        <Metric
          imgUrl="/assets/icons/like.svg"
          href=""
          alt="Upvotes"
          value={formatNumberWithExtension(upvotes.length)}
          title="Upvotes"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          href=""
          alt="Message"
          value={formatNumberWithExtension(answers.length)}
          title="Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          href=""
          alt="Eye"
          value={formatNumberWithExtension(views)}
          title="Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
    </div>
  );
}

export default QuestionCard;
