import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dollatham Charoenthammakit | AI Engineer & Full-Stack Developer",
  description:
    "Portfolio of Dollatham Charoenthammakit — AI Engineer specializing in Machine Learning, Deep Learning, Computer Vision, and Full-Stack Development. KMUTT Applied Computer Science student.",
  keywords: [
    "AI Engineer",
    "Machine Learning",
    "Deep Learning",
    "Full-Stack Developer",
    "Computer Vision",
    "KMUTT",
    "Portfolio",
  ],
  openGraph: {
    title: "Dollatham Charoenthammakit | AI Engineer",
    description:
      "AI Engineer & Full-Stack Developer portfolio — Machine Learning, Computer Vision, and production-ready applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
