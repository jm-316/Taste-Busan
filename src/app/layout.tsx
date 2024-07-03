import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Taste Busan",
  description: "부산의 맛집을 알려주는 맛집 앱",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="pt-[52px]">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
