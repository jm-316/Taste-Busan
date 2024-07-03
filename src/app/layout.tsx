import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Taste Busan",
  description: "부산의 맛집을 알려주는 맛집 앱",
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
