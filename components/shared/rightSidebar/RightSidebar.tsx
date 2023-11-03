import Image from "next/image";
import Link from "next/link";
import RenderTag from "../renderTag/RenderTag";

const questions = [
  {
    _id: 1,
    title: "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
  },
  {
    _id: 2,
    title: "Can I get the course for free?",
  },
  {
    _id: 3,
    title: "Redux Toolkit Not Updating State as Expected",
  },
  {
    _id: 4,
    title: "Async/Await Function Not Handling Errors Properly",
  },
  {
    _id: 5,
    title: "How do I use express as a custom server in NextJS?",
  },
];
const tags = [
  {
    _id: "1",
    name: "NextJS",
    totalQuestions: 5,
  },
  {
    _id: "2",
    name: "React",
    totalQuestions: 3,
  },
  {
    _id: "3",
    name: "CSS",
    totalQuestions: 8,
  },
  {
    _id: "4",
    name: "HTML",
    totalQuestions: 10,
  },
  {
    _id: "5",
    name: "NodeJS",
    totalQuestions: 13,
  },
];

function TopQuestions() {
  return (
    <div>
      <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
      <div className="mt-7 flex w-full flex-col gap-[30px]">
        {questions.map((item) => {
          return (
            <Link
              href={`/questions/${item._id}`}
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
        })}
      </div>
    </div>
  );
}
function PopularTags() {
  return (
    <div className="mt-16">
      <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
      <div className="mt-7 flex flex-col gap-4">
        {tags.map((item) => (
          <RenderTag key={item._id} _id={item._id} name={item.name} totalQuestions={item.totalQuestions} showCount />
        ))}
      </div>
    </div>
  );
}

function RightSidebar() {
  return (
    <section className="custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <TopQuestions />
      <PopularTags />
    </section>
  );
}

export default RightSidebar;
