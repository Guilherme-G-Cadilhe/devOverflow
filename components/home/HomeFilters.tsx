"use client";

import { Button } from "@/components/ui/button";
import { CHomePageFilters } from "@/constants/filters";
import { createUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
interface CustomFilterProps {
  otherClasses?: string;
  containerClasses?: string;
}
function HomeFilters({ otherClasses, containerClasses }: CustomFilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [active, setActive] = useState(searchParams.get("filter") || "");

  const handleTypeclick = (item: string) => {
    if (active === item) {
      setActive("");
      const newUrl = createUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: null,
      });

      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);
      const newUrl = createUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: item.toLowerCase(),
      });
      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {CHomePageFilters.map((filter) => (
        <Button
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
            active === filter.value
              ? "bg-primary-100 text-primary-500"
              : "bg-light-800 text-light-500 hover:bg-light-700 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-400"
          }`}
          key={filter.value}
          onClick={() => handleTypeclick(filter.value)}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
}

export default HomeFilters;
