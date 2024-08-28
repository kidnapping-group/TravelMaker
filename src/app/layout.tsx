import ReactQueryProviders from "@/contexts/ReactQueryProviders";
import GoogleAnalytics from "@/lib/GoogleAnalytics";
import type { Metadata } from "next";
import localFont from "next/font/local";

import ScrollTop from "./_components/ScrollTop";
import "./globals.css";

export const metadata: Metadata = {
  title: "Travel Maker",
  description: "여행 만들기",
  icons: {
    icon: "@/app/favicon.ico",
  },
};

const pretendardFont = localFont({
  src: "../../public/fonts/PretendardGOVVariable.ttf",
  display: "swap",
});
const APIKey = process.env.NEXT_PUBLIC_MAP_API_KEY;

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${APIKey}&libraries=places`}
          async
          defer
        />
      </head>
      <body className={`${pretendardFont.className} text-black`}>
        <ScrollTop />
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        <ReactQueryProviders>{children}</ReactQueryProviders>
      </body>
    </html>
  );
}

export default RootLayout;
