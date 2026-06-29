import type { Metadata } from "next";
import "./globals.css";

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
