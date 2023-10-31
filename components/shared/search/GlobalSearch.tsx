"use client";
import Image from "next/image";
import { Input } from "@/components/ui/input";

function GlobalSearch() {
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image src="/assets/icons/search.svg" width={24} height={24} alt="Search" className="cursor-pointer" />
        <Input
          onChange={(e) => console.log(e)}
          type="text"
          placeholder="Search things globally..."
          value=""
          className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
        />
      </div>
    </div>
  );
}

export default GlobalSearch;
