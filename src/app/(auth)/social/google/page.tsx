"use client";

import OauthAPI from "@/apis/OauthAPI";
import axios from "axios";
import crypto from "crypto";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function GoogleRedirect() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const domain = `${window.location.origin}/social/google`;

  // 랜덤 문자열 생성 함수
  const generateRandomName = useCallback(
    (length: number = 32): string => crypto.randomBytes(length).toString("hex"),
    [],
  );

  // Google OAuth 토큰 가져오기
  const getGoogleToken = useCallback(async (code: string): Promise<string> => {
    const url = "https://oauth2.googleapis.com/token";

    const body = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || "",
      redirect_uri: domain || "",
      code,
    });

    const { data } = await axios.post(url, body.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    return data.id_token;
  }, []);

  const handleGoogleRedirect = useCallback(async () => {
    // Google 인가 코드 추출
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const nickname = generateRandomName();

    if (code) {
      const token = await getGoogleToken(code);
      const data = {
        nickname,
        token,
        redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || "",
      };

      // 회원가입 시도
      try {
        const response = await OauthAPI.postSignup("google", data);
        if (response) {
          setIsLoading(false);
          router.push("/");
        }
      } catch (error) {
        let err = String(error);
        if (err === "이미 등록된 사용자입니다.") {
          const signinData = {
            token,
            redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || "",
          };
          const signinResponse = await OauthAPI.postSignin("google", signinData);
          if (signinResponse) {
            setIsLoading(false);
            router.push("/");
          }
        }
      }
    }
  }, [generateRandomName, getGoogleToken, router]);

  useEffect(() => {
    handleGoogleRedirect();
  }, [handleGoogleRedirect]);

  if (isLoading) {
    return <div>소셜 로그인 중입니다!</div>;
  }

  return null;
}
