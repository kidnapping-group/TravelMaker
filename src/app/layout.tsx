import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

export const metadata: Metadata = {
  title: "Travel Maker",
  description: "여행 만들기",
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
    <html lang="en">
      <body className={pretendardFont.className}>{children}</body>
    </html>
  );
}

export default RootLayout;
