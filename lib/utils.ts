import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { RemoveUrlQueryParams, UrlQueryParams } from "./actions/shared.types";
import qs from "query-string";
import { CBADGE_CRITERIA } from "@/constants";
import { BadgeCounts } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimestamp = (createdAt: Date): string => {
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - createdAt.getTime();

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years >= 1) {
    return `${years} Year${years > 1 ? "s" : ""} ago`;
  } else if (months >= 1) {
    return `${months} Month${months > 1 ? "s" : ""} ago`;
  } else if (weeks >= 1) {
    return `${weeks} Week${weeks > 1 ? "s" : ""} ago`;
  } else if (days >= 1) {
    return `${days} Day${days > 1 ? "s" : ""} ago`;
  } else if (hours >= 1) {
    return `${hours} Hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes >= 1) {
    return `${minutes} Minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return `${seconds} Second${seconds > 1 ? "s" : ""} ago`;
  }
};

export const formatNumberWithExtension = (number: number): string => {
  if (number >= 1000000) {
    // For numbers in millions, round to one decimal place
    return (number / 1000000).toFixed(1) + "M";
  } else if (number >= 1000) {
    // For numbers above 10,000 and below a million, round to the nearest thousand
    return Math.round(number / 1000) + "K";
  } else {
    // For smaller numbers, no extension needed
    return number.toString();
  }
};

export const getJoinedDate = (date: Date): string => {
  // Get month and year from the Date object
  const month = date.toLocaleDateString("default", { month: "long" });
  const year = date.getFullYear();

  const formattedDate = `${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
  return formattedDate;
};

export const createUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const currentUrl = qs.parse(params);
  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    {
      skipNull: true,
    }
  );
};

export const removeKeysFromQuery = ({ params, keysToRemove }: RemoveUrlQueryParams) => {
  const currentUrl = qs.parse(params);
  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    {
      skipNull: true,
    }
  );
};

interface BadgeParam {
  criteria: {
    type: keyof typeof CBADGE_CRITERIA;
    count: number;
  }[];
}
export const assignBadges = (params: BadgeParam) => {
  const badgeCounts: BadgeCounts = {
    GOLD: 0,
    SILVER: 0,
    BRONZE: 0,
  };

  const { criteria } = params;
  criteria.forEach(({ type, count }) => {
    const badgeLevels: any = CBADGE_CRITERIA[type];

    Object.keys(badgeLevels).forEach((levelAmount) => {
      if (count >= badgeLevels[levelAmount]) {
        badgeCounts[levelAmount as keyof BadgeCounts] += 1;
      }
    });
  });
  return badgeCounts;
};
