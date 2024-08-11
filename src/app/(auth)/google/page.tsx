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

    const body = {
      grant_type: "authorization_code",
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || "",
      redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || "",
      // code는 url 에서 추출
      code,
    };
    const { data } = await axios.post(url, body, {
      headers: {
        // Google OAuth와 같은 서비스에서 토큰 요청 시 작성하는 컨텐츠 타입
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
    return data.id_token;
  };

  useEffect(() => {
    const handleGoogleRedirect = async () => {
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
        // 추출값 기준으로 회원가입
        const response = await OauthAPI.postSignup("google", data);
        // 성공시 로그인 후 메인페이지로 리디렉션
        if (response) {
          setIsLoading(false);
          router.push("/");
        }
      }
    };

    handleGoogleRedirect();
  }, [router]);

  if (isLoading) {
    return <div> 소셜 로그인 중입니다!</div>;
  }

  return null;
}
