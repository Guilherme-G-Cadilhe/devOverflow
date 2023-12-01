"use client";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { createUrlQuery, removeKeysFromQuery } from "@/lib/utils";

interface CustomInputProps {
  route: string;
  iconPosition: "left" | "right";
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}

function LocalSearchbar({ route, iconPosition, imgSrc, placeholder, otherClasses }: CustomInputProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useState(searchParams.get("q") || "");

  // Using Debounce technique for search Query
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        const newUrl = createUrlQuery({
          params: searchParams.toString(),
          key: "q",
          value: query,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["q"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, route, pathname, router, searchParams]);

  // const createQueryString = useCallback(
  //   (value: string) => {
  //     const newParams = new URLSearchParams(searchParams);

  //     if (value === "") {
  //       newParams.delete("q");
  //     } else {
  //       newParams.set("q", value);
  //     }
  //     router.push(`/?${newParams.toString()}`);
  //   },
  //   [searchParams]
  // );

  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image src={imgSrc} width={24} height={24} alt="Search icon" className="cursor-pointer" />
      )}
      <Input
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder={placeholder}
        value={query}
        autoComplete="off"
        className="paragraph-regular no-focus text-dark400_light700 placeholder background-light800_darkgradient border-none shadow-none outline-none"
      />
      {iconPosition === "right" && (
        <Image src={imgSrc} width={24} height={24} alt="Search icon" className="cursor-pointer" />
      )}
    </div>
  );
}

export default LocalSearchbar;
