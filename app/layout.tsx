import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CriderSafe Command",
  description: "Prototype school safety command dashboard for CriderSafe Platform.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
