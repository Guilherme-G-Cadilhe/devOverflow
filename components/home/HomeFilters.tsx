"use client";

import { Button } from "@/components/ui/button";
import { CHomePageFilters } from "@/constants/filters";
interface CustomFilterProps {
  otherClasses?: string;
  containerClasses?: string;
}
function HomeFilters({ otherClasses, containerClasses }: CustomFilterProps) {
  const active = "newest";

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
          onClick={() => {}}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
}

export default HomeFilters;
