import Image from "next/image";

type ReportIconProps = {
  src: string;
  className?: string;
  size?: number;
};

export function ReportIcon({ src, className, size = 18 }: ReportIconProps) {
  return (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      className={className}
      unoptimized
    />
  );
}
