import Image from "next/image";
import { PRODUCT_NAME } from "@/app/lib/landing/constants";

const columns = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "#how-it-works" },
      { label: "Verification layer", href: "#verification-layer" },
      { label: "Light Mode", href: "#how-it-works" },
      { label: "Deep Mode", href: "#how-it-works" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog / Protocol Notes", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "Case studies", href: "#case-study" },
      { label: "Security overview", href: "#" },
      { label: "API reference", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "#" },
      { label: "Terms of service", href: "#" },
      { label: "Data processing agreement (GDPR)", href: "#" },
      { label: "Cookie policy", href: "#" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[color:var(--footer-bg)] text-[color:var(--footer-text)]">
      <div className="container py-[var(--space-16)]">
        <div className="mb-[var(--space-12)] flex items-center gap-[var(--space-3)]">
          <Image src="/a16zero.png" alt="" width={28} height={28} className="h-7 w-7 opacity-90" />
          <span className="text-sm font-medium text-[color:var(--footer-heading)]">{PRODUCT_NAME}</span>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
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
            <a href="https://github.com" className="hover:text-[color:var(--footer-heading)]" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://x.com" className="hover:text-[color:var(--footer-heading)]" rel="noopener noreferrer">
              X
            </a>
            <span className="rounded-[var(--radius-base)] border border-white/15 px-2 py-0.5 text-[11px]">GDPR</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
