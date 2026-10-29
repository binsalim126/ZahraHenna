import React from "react";
import Link from "next/link";

interface LogoProps {
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  iconOnly?: boolean;
}

export const LogoEmblem: React.FC<{
  isLight?: boolean;
  className?: string;
}> = ({ isLight = false, className = "w-7 h-7" }) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} transition-transform duration-300 group-hover:scale-105`}
  >
    {/* Moringa Leaf contour */}
    <path
      d="M20 4C13 12 7 20 10 30C12 36.5 20 37 20 37C20 37 28 36.5 30 30C33 20 27 12 20 4Z"
      fill={isLight ? "#A9C47F" : "#5E8C31"}
      fillOpacity={isLight ? "0.3" : "0.2"}
      stroke={isLight ? "#FAF3E8" : "#5E8C31"}
      strokeWidth="2"
    />
    {/* Natural Henna-Drop center in Henna Brown */}
    <path
      d="M20 14C17.5 19 16 23 17.5 26.5C18.5 28.5 21.5 28.5 22.5 26.5C24 23 22.5 19 20 14Z"
      fill={isLight ? "#C98A4B" : "#5A2E1A"}
    />
    {/* Soft vein */}
    <path
      d="M20 8V33"
      stroke={isLight ? "#FAF3E8" : "#A9C47F"}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const Logo: React.FC<LogoProps> = ({
  variant = "dark",
  size = "md",
  iconOnly = false,
}) => {
  const isLight = variant === "light";

  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  const iconSizes = {
    sm: "w-5 h-5",
    md: "w-7 h-7",
    lg: "w-8 h-8",
  };

  return (
    <Link href="/" className="inline-flex items-center gap-2 group tracking-tight">
      <LogoEmblem isLight={isLight} className={iconSizes[size]} />

      {!iconOnly && (
        <div className="flex flex-col">
          <span
            className={`font-heading font-extrabold tracking-tight leading-none ${sizeClasses[size]} ${
              isLight ? "text-cream" : "text-henna"
            }`}
          >
            Zahra{" "}
            <span className={isLight ? "text-sand" : "text-henna-dark font-medium"}>
              Henna
            </span>
          </span>
          <span
            className={`text-[9px] uppercase tracking-[0.2em] font-bold mt-0.5 ${
              isLight ? "text-cream/75" : "text-moringa"
            }`}
          >
            100% Natural • Pure Henna
          </span>
        </div>
      )}
    </Link>
  );
};
