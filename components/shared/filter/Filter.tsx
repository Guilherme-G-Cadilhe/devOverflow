"use client";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface CustomFilterProps {
  filterOptions: {
    name: string;
    value: string;
  }[];
  placeholder: string;
  otherClasses?: string;
  containerClasses?: string;
}

function Filter({ filterOptions = [], placeholder, otherClasses, containerClasses }: CustomFilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paramFilter = searchParams.get("filter");

  const handleUpdateParams = (value: string) => {
    const newUrl = createUrlQuery({
      params: searchParams.toString(),
      key: "filter",
      value,
    });
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className={`relative ${containerClasses}`}>
      <Select onValueChange={handleUpdateParams} defaultValue={paramFilter || ""}>
        <SelectTrigger
          className={`${otherClasses} body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5`}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder={placeholder} />
          </div>
        </SelectTrigger>
        <SelectContent className="background-light900_dark200">
          <SelectGroup>
            {filterOptions.map((options) => (
              <SelectItem key={options.value} value={options.value}>
                {options.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default Filter;
