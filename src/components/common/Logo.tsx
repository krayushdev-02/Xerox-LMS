import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  className?: string;
  asLink?: boolean;
}

export default function Logo({
  size = "md",
  showTagline = false,
  className = "",
  asLink = true,
}: LogoProps) {
  const sizeMap = {
    sm: { img: 34, text: "text-lg", tag: "text-[10px]" },
    md: { img: 44, text: "text-xl", tag: "text-xs" },
    lg: { img: 56, text: "text-2xl", tag: "text-sm" },
  };

  const currentSize = sizeMap[size];

  const content = (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div className="relative overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 flex-shrink-0 transition-transform duration-200 hover:scale-105">
        <Image
          src="/logo.jpg"
          alt={`${SITE_NAME} Logo`}
          width={currentSize.img}
          height={currentSize.img}
          className="object-contain"
          priority
        />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-1 font-bold tracking-tight">
          <span className="text-brand-navy-700 dark:text-white transition-colors">
            Xerox
          </span>
          <span className="text-brand-red-500 font-extrabold">LMS</span>
        </div>
        {showTagline && (
          <span
            className={`font-medium text-brand-grey-600 dark:text-brand-grey-400 ${currentSize.tag}`}
          >
            {SITE_TAGLINE}
          </span>
        )}
      </div>
    </div>
  );

  if (asLink) {
    return (
      <Link href="/" className="inline-flex items-center focus:outline-none">
        {content}
      </Link>
    );
  }

  return content;
}

