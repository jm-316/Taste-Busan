import type { Metadata } from "next";
import { NextLayout, NextProvider } from "./provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Taste Busan",
  description: "부산의 맛집을 알려주는 맛집 앱",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextProvider>
          <NextLayout>{children}</NextLayout>
        </NextProvider>
      </body>
    </html>
  );
}
