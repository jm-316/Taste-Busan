import type { Metadata } from "next";
import { NextLayout, NextProvider } from "./provider";
import "./globals.css";
import GoogleAnalytics from "./googleAnalytics";

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
        <GoogleAnalytics GA_TRACKING_ID={process.env.NEXT_PUBLIC_GA_ID} />
        <NextProvider>
          <NextLayout>{children}</NextLayout>
        </NextProvider>
      </body>
    </html>
  );
}
