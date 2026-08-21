import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kvalitetsplan | Quality WorX",
  description:
    "Digital kvalitetsplan för byggprojekt – formulär, spara och export till PDF/Word.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body>{children}</body>
    </html>
  );
}
