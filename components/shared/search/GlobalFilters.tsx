"use client";
import { CGlobalSearchFilters } from "@/constants/filters";
import { createUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const GlobalFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const typeParams = searchParams.get("type");
  const [active, setActive] = useState(typeParams || "");

  const handleTypeclick = (filter: string) => {
    if (active === filter) {
      setActive("");
      const newUrl = createUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: null,
      });

      router.push(newUrl, { scroll: false });
    } else {
      setActive(filter);
      const newUrl = createUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: filter.toLowerCase(),
      });
      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className="flex items-center gap-5 px-5">
      <p className="text-dark400_light900 body-medium">Type: </p>
      <div className="flex gap-3">
        {CGlobalSearchFilters.map((filter) => (
          <button
            className={`light-border-2 small-medium rounded-2xl px-5 py-2 capitalize dark:text-light-800 dark:hover:text-primary-500
             ${
               active === filter.value
                 ? "bg-primary-500 text-light-900 dark:hover:text-light-900"
                 : "bg-light-700 text-dark-400 hover:text-primary-500 dark:bg-dark-500"
             }
            `}
            type="button"
            onClick={() => handleTypeclick(filter.value)}
            key={filter.value}
          >
            {filter.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GlobalFilters;
