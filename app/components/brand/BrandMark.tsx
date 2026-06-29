import Image from "next/image";
import type { CSSProperties } from "react";
import { PRODUCT_NAME } from "@/app/lib/landing/constants";
import { cn } from "@/app/lib/cn";

type BrandMarkProps = {
  className?: string;
  iconSize?: number;
  labelClassName?: string;
};

export function BrandMark({ className, iconSize = 32, labelClassName }: BrandMarkProps) {
  return (
    <span className={cn("flex shrink-0 items-center gap-2", className)}>
      <Image
        src="/a16zero.png"
        alt=""
        width={iconSize}
        height={iconSize}
        className="h-[var(--brand-icon-size)] w-[var(--brand-icon-size)]"
        priority={iconSize >= 32}
        style={{ "--brand-icon-size": `${iconSize}px` } as CSSProperties}
      />
      <span className={cn("text-sm font-medium tracking-tight", labelClassName)}>{PRODUCT_NAME}</span>
    </span>
  );
}
