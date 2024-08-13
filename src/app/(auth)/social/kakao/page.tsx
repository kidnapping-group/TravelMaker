"use client";

import OauthAPI from "@/apis/OauthAPI";
import kakaoSocialStatusStore from "@/store/kakaoSocialStatusStore";
import crypto from "crypto";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function KakaoRedirect() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { alreadyExistKakaoUser, socialSignupFail, socialLoginSuccess } = kakaoSocialStatusStore();
  const domain = `${window.location.origin}/social/kakao`;
  // 랜덤 문자열 생성 함수
  const generateRandomName = (length: number = 32): string =>
    crypto.randomBytes(length).toString("hex");

  useEffect(() => {
    const handleKakaoRedirect = async () => {
      // kakao 인가 code 추출
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");
      const nickname = generateRandomName();

      // 발급받은 인가 코드로 토큰 발급
      if (code && !alreadyExistKakaoUser) {
        const data = {
          nickname,
          token: code,
          redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI || "",
        };
        try {
          const response = await OauthAPI.postSignup("kakao", data);
          if (response) {
            setIsLoading(false);
            router.push("/");
          }
        } catch (error) {
          let err = String(error);
          if (err === "이미 등록된 사용자입니다.") {
            socialSignupFail(); //
            setTimeout(() => {
              const updatedState = kakaoSocialStatusStore.getState().alreadyExistKakaoUser;
              if (updatedState) {
                router.push(
                  `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_RESTAPI_KEY}&redirect_uri=${domain}&scope=profile_nickname,profile_image`,
                );
              }
            }, 0);
          }
        }
      }

      if (code && alreadyExistKakaoUser) {
        const data = {
          token: code,
          redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI || "",
        };
        const response = await OauthAPI.postSignin("kakao", data);
        if (response) {
          setIsLoading(false);
          socialLoginSuccess();
          router.push("/");
        }
      }
    };

    handleKakaoRedirect();
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return null;
}
export default KakaoRedirect;
