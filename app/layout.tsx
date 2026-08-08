import type { Metadata } from "next";
import "./globals.css";
import "./styles/theme.css";
import "./styles/base.css";
import "./styles/problem-value.css";
import "./styles/how-it-works.css";
import "./styles/shared-ui.css";
import "./styles/reveals.css";
import "./styles/cv-misses.css";

export const metadata: Metadata = {
  title: "16 Signals - Verified Engineering Shortlists",
  description:
    "Verification layer that filters candidate pools into evidence-backed engineering shortlists before your first interview.",
  icons: {
    icon: "/a16zero.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
