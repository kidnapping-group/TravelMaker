"use client";

import OauthAPI from "@/apis/OauthAPI";
import kakaoSocialStatusStore from "@/store/kakaoSocialStatusStore";
import socialLoginStore from "@/store/socialLoginStore";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

function KakaoRedirect() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const {
    alreadyGetUserData,
    alreadyExistKakaoUser,
    socialSignupFail,
    socialLoginSuccess,
    getUserData,
  } = kakaoSocialStatusStore();
  const { updateKakaoProfile } = socialLoginStore();
  const domain = `${process.env.NEXT_PUBLIC_URL}/social/kakao`;

  // Kakao accessToken 토큰 가져오기
  const getKakaoToken = useCallback(async (code: string | null) => {
    const url = "https://kauth.kakao.com/oauth/token";

    const body = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.NEXT_PUBLIC_KAKAO_RESTAPI_KEY || "",
      redirect_uri: domain || "",
      code: code || "",
    });

    const { data } = await axios.post(url, body.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
    return data.access_token;
  }, []);

  // Kakao 유저 데이터 가져오기
  const getKakaoUserData = useCallback(async (accessToken: string) => {
    const url = "https://kapi.kakao.com/v2/user/me";

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data.properties.nickname;
  }, []);

  useEffect(() => {
    const handleKakaoRedirect = async () => {
      // kakao 인가 code 추출
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");
      if (!alreadyGetUserData) {
        const accessToken = await getKakaoToken(code);
        const nickname = await getKakaoUserData(accessToken);
        updateKakaoProfile(nickname);
        await getUserData();
        await router.push(
          `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_RESTAPI_KEY}&redirect_uri=${domain}&scope=profile_nickname,profile_image`,
        );
      } else {
        const { nickname } = socialLoginStore.getState();
        if (code && !alreadyExistKakaoUser && nickname) {
          const data = {
            nickname,
            token: code,
            redirectUri: domain || "",
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

        if (code && alreadyExistKakaoUser && nickname) {
          const data = {
            token: code,
            redirectUri: domain || "",
          };
          const response = await OauthAPI.postSignin("kakao", data);
          if (response) {
            setIsLoading(false);
            socialLoginSuccess();
            router.push("/");
          }
        }
      }
    };

    handleKakaoRedirect();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex h-[100vh] w-full flex-col items-center justify-center">
        <Image
          src="/images/KAKAO.png"
          width={400}
          height={400}
          alt="카카오로고"
          className="animate-[bounce_0.7s_ease-in-out_infinite]"
        />
        <p className="text-[40px]">카카오 로그인 중...</p>
      </div>
    );
  }

  return null;
}
export default KakaoRedirect;
