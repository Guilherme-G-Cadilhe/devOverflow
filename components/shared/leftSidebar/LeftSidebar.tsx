"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CSidebarLinks } from "@/constants";
import { SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
const NavContent = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-1 flex-col gap-6">
      {CSidebarLinks.map((item) => {
        const isActive = (pathname.includes(item.route) && item.route.length > 1) || pathname === item.route;
        return (
          <Link
            key={item.label}
            href={item.route}
            className={`${
              isActive ? "primary-gradient rounded-lg text-light-900" : "text-dark300_light900"
            } flex items-center justify-start gap-4 bg-transparent p-4`}
          >
            <Image
              src={item.imgURL}
              alt={item.label}
              width={20}
              height={20}
              className={`${isActive ? "" : "invert-colors"}`}
            />
            <p className={`${isActive ? "base-bold" : "base-medium"} max-lg:hidden`}>{item.label}</p>
          </Link>
        );
      })}
    </div>
  );
};

function LeftSidebar() {
  return (
    <section className="custom-scrollbar background-light900_dark200 light-border sticky left-0 top-0 flex h-screen w-fit flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <NavContent />
      <SignedOut>
        <div className="flex flex-col gap-3">
          <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none" asChild>
            <Link href="/sign-in">
              <Image
                src="/assets/icons/account.svg"
                width={20}
                height={20}
                alt="login"
                className="invert-colors lg:hidden"
              />
              <span className="primary-text-gradient font-bold max-lg:hidden">Log In</span>
            </Link>
          </Button>

          <Button
            className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 font-semibold shadow-none"
            asChild
          >
            <Link href="/sign-up">
              <Image
                src="/assets/icons/sign-up.svg"
                width={20}
                height={20}
                alt="sign up"
                className="invert-colors lg:hidden"
              />
              <span className="max-lg:hidden">Sign up</span>
            </Link>
          </Button>
        </div>
      </SignedOut>
    </section>
  );
}

export default LeftSidebar;
