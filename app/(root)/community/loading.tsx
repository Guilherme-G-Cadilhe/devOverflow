import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>

      <div className=" mb-12 mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center ">
        <Skeleton className="h-14 flex-1" />
        <Skeleton className="h-14 w-28" />
      </div>
      <section className="mt-12 flex flex-wrap gap-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="w-full max-xs:min-w-full xs:w-[260px]">
            <Skeleton key={item} className="flex h-44 w-full  rounded-2xl  p-8" />
          </div>
        ))}
      </section>
    </>
  );
};

export default Loading;
