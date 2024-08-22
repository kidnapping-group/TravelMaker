import ReactQueryProviders from "@/contexts/ReactQueryProviders";
import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

export const metadata: Metadata = {
  title: "Travel Maker",
  description: "여행 만들기",
  icons: {
    icon: "./favicon.ico",
  },
};

const pretendardFont = localFont({
  src: "../../public/fonts/PretendardGOVVariable.ttf",
  display: "swap",
});

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendardFont.className} text-black`}>
        <ReactQueryProviders>{children}</ReactQueryProviders>
      </body>
    </html>
  );
}

export default RootLayout;
