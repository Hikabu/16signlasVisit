import Image from "next/image";
import { PRODUCT_NAME } from "@/app/lib/landing/constants";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Verification layer", href: "#verification-layer" },
      { label: "Problems", href: "#problems" },
      { label: "How it works", href: "#how-it-works" },
    ],
  },
  {
    title: "Trust",
    links: [
      { label: "Security overview", href: "#" },
      { label: "Privacy policy", href: "#" },
      { label: "Data processing agreement (GDPR)", href: "#" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[color:var(--footer-bg)] text-[color:var(--footer-text)]">
      <div className="container py-[var(--space-16)]">
        <div className="mb-[var(--space-12)] flex items-center gap-[var(--space-3)]">
          <Image src="/a16zero.png" alt="" width={28} height={28} className="h-7 w-7 opacity-90" />
          <span className="text-sm font-medium text-[color:var(--footer-heading)]">{PRODUCT_NAME}</span>
        </div>

        <div className="grid gap-10 sm:grid-cols-2">
          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="text-sm font-medium text-[color:var(--footer-heading)]">{col.title}</h2>
              <ul className="mt-[var(--space-4)] space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[color:var(--footer-text)] transition-colors duration-200 hover:text-[color:var(--footer-heading)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          id="contact"
          className="mt-[var(--space-12)] flex flex-col gap-[var(--space-4)] border-t border-white/10 pt-[var(--space-8)] text-sm sm:flex-row sm:items-center sm:justify-between"
        >
          <p>
            © {year} {PRODUCT_NAME}. Verification layer for skills.
          </p>
          <div className="flex items-center gap-[var(--space-6)]">
            <span className="rounded-[var(--radius-base)] border border-white/15 px-2 py-0.5 text-[11px]">GDPR</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
