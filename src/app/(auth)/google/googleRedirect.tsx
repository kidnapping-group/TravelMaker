"use client";

import OauthAPI from "@/apis/OauthAPI";
import axios from "axios";
import crypto from "crypto";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function GoogleRedirect() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // 랜덤 문자열 생성 함수
  const generateRandomName = (length: number = 32): string =>
    crypto.randomBytes(length).toString("hex");

  // Google OAuth 토큰 가져오기
  const getGoogleToken = async (code: string): Promise<string> => {
    const url = "https://oauth2.googleapis.com/token";

    const bodyData = {
      grant_type: "authorization_code",
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || "",
      redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || "",
      code,
    };
    const { data } = await axios.post(url, bodyData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
    return data.id_token;
  };

  useEffect(() => {
    const handleGoogleRedirect = async () => {
      if (typeof window === "undefined") return;

      // Google 인가 코드 추출
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");
      const nickname = generateRandomName();

      // 발급받은 인가 코드로 토큰 발급
      if (code) {
        const token = await getGoogleToken(code);
        const data = {
          nickname,
          token,
          redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || "",
        };

        const res = await OauthAPI.postSignin("google", data);
        if (res) {
          setIsLoading(false);
          router.push("/");
        }
      }
    };

    handleGoogleRedirect();
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return null;
}
