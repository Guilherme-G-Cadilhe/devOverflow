import Image from "next/image";
import Link from "next/link";
import RenderTag from "../renderTag/RenderTag";
import { getHotQuestions } from "@/lib/actions/question.action";
import { IQuestion } from "@/database/question.model";
import { getTopPopularTags } from "@/lib/actions/tag.actions";

function TopQuestions({ questions }: { questions: IQuestion[] }) {
  return (
    <div>
      <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
      <div className="mt-7 flex w-full flex-col gap-[30px]">
        {questions.length > 0 ? (
          questions.map((item) => {
            return (
              <Link
                href={`/question/${item._id}`}
                key={item._id}
                className="flex cursor-pointer items-center justify-between gap-7"
              >
                <p className="body-medium text-dark500_light700">{item.title}</p>
                <Image
                  src={"/assets/icons/chevron-right.svg"}
                  alt="chevron right"
                  width={20}
                  height={20}
                  className="invert-colors"
                />
              </Link>
            );
          })
        ) : (
          <p>No Questions yet..</p>
        )}
      </div>
    </div>
  );
}
function PopularTags({ tags }: { tags: { _id: string; name: string; totalQuestions: number }[] }) {
  return (
    <div className="mt-16">
      <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
      <div className="mt-7 flex flex-col gap-4">
        {tags.length > 0 ? (
          tags.map((item) => (
            <RenderTag key={item._id} _id={item._id} name={item.name} totalQuestions={item.totalQuestions} showCount />
          ))
        ) : (
          <p>No Tags yet..</p>
        )}
      </div>
    </div>
  );
}

async function RightSidebar() {
  const hotQuestions = await getHotQuestions();
  const popularTags = await getTopPopularTags();

  return (
    <section className="custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <TopQuestions questions={hotQuestions} />
      <PopularTags tags={popularTags} />
    </section>
  );
}

export default RightSidebar;
