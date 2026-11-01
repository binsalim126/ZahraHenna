import React from "react";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  iconOnly?: boolean;
  className?: string;
  href?: string;
}

export const LogoEmblem: React.FC<{
  isLight?: boolean;
  className?: string;
}> = ({ isLight = false, className = "w-8 h-8" }) => {
  const logoSrc = isLight
    ? "/assets/images/zahra-henna-logo-light.png"
    : "/assets/images/zahra-henna-logo-transparent.png";

  return (
    <div
      className={`relative flex-shrink-0 aspect-square transition-transform duration-300 group-hover:scale-105 ${className}`}
    >
      <Image
        src={logoSrc}
        alt="Zahra Henna Logo"
        fill
        sizes="(max-width: 768px) 48px, 64px"
        className="object-contain"
        priority
      />
    </div>
  );
};

export const Logo: React.FC<LogoProps> = ({
  variant = "dark",
  size = "md",
  iconOnly = false,
  className = "",
  href = "/",
}) => {
  const isLight = variant === "light";

  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };

  const content = (
    <div className={`inline-flex items-center gap-2.5 group tracking-tight ${className}`}>
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
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex">
        {content}
      </Link>
    );
  }

  return content;
};
