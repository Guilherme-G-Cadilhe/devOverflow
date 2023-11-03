"use client";
import Image from "next/image";
import { Input } from "@/components/ui/input";

interface CustomInputProps {
  route: string;
  iconPosition: "left" | "right";
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}

function LocalSearchbar({ route, iconPosition, imgSrc, placeholder, otherClasses }: CustomInputProps) {
  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image src={imgSrc} width={24} height={24} alt="Search icon" className="cursor-pointer" />
      )}
      <Input
        onChange={(e) => console.log(e)}
        type="text"
        placeholder={placeholder}
        value=""
        className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
      />
      {iconPosition === "right" && (
        <Image src={imgSrc} width={24} height={24} alt="Search icon" className="cursor-pointer" />
      )}
    </div>
  );
}

export default LocalSearchbar;
