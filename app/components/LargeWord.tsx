export function LargeWord({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <span aria-hidden="true" className={`large-word ${className}`.trim()}>
      {children}
    </span>
  );
}
