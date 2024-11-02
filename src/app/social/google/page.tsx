"use client";

import { createClient } from "@rivermountain/fetch-to-axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import OauthAPI from "@/apis/OauthAPI";
import userAPI from "@/apis/usersAPI";

import socialLoginStore from "@/store/socialLoginStore";

// Google User Info용 클라이언트 생성
const googleUserClient = createClient();

export default function GoogleRedirect() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const domain = `${process.env.NEXT_PUBLIC_URL}/social/google`;
  const { updateProfileImageUrl } = socialLoginStore();

  // Google OAuth 토큰 가져오기
  const getGoogleToken = useCallback(
    async (code: string) => {
      const url = "https://oauth2.googleapis.com/token";

      const formData = new URLSearchParams({
        grant_type: "authorization_code",
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
        client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || "",
        redirect_uri: domain || "",
        code,
      });

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      const data = await response.json();

      return { token: data.id_token, accessToken: data.access_token };
    },
    [domain],
  );

  // Google 유저 데이터 가져오기
  const getGoogleUserData = useCallback(async (accessToken: string) => {
    const url = "https://www.googleapis.com/oauth2/v3/userinfo";

    const data = await googleUserClient.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  }, []);

  // Google Image를 formData로 변경
  const updateUserProfile = async (picture: string) => {
    const response = await fetch(picture);
    const blob = await response.blob();

    const formData = new FormData();
    formData.append("image", blob, "profile.jpg");

    const { profileImageUrl } = await userAPI.postUsersImage(formData);
    return profileImageUrl;
  };

  // 실제 회원가입&로그인 실행 함수
  const handleGoogleRedirect = useCallback(async () => {
    // Google 인가 코드 추출
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");

    if (code) {
      // 토큰 획득
      const { token, accessToken } = await getGoogleToken(code);
      const userData = await getGoogleUserData(accessToken);

      const data = {
        nickname: userData.name,
        token,
        redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || "",
      };

      try {
        // 회원가입 시도
        const response = await OauthAPI.postSignup("google", data);
        if (response) {
          const profileImageUrl = await updateUserProfile(userData.picture);
          const patchImg = await userAPI.patchUsers({
            profileImageUrl,
          });
          if (patchImg) {
            updateProfileImageUrl(profileImageUrl);
            setIsLoading(false);
            router.push("/", { scroll: true });
          }
        }
      } catch (error) {
        let err = String(error);
        // 이미 가입된 사용자인 경우 로그인 진행
        if (err === "이미 등록된 사용자입니다.") {
          const signinData = {
            token,
            redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || "",
          };
          const signinResponse = await OauthAPI.postSignin("google", signinData);

          if (signinResponse) {
            const profileImageUrl = await updateUserProfile(userData.picture);
            const patchData = await userAPI.patchUsers({
              nickname: userData.name,
              profileImageUrl,
            });
            if (patchData) {
              updateProfileImageUrl(profileImageUrl);
              setIsLoading(false);
              router.push("/", { scroll: true });
            }
          }
        }
      }
    }
  }, [getGoogleUserData, getGoogleToken, router, updateProfileImageUrl]);

  useEffect(() => {
    handleGoogleRedirect();
  }, [handleGoogleRedirect]);

  if (isLoading) {
    return (
      <div className="flex h-[100vh] w-full flex-col items-center justify-center">
        <Image
          src="/images/google.png"
          width={400}
          height={400}
          alt="구글 로고"
          className="animate-[spin_2s_linear_infinite]"
        />
        <p className="text-[40px]">구글 로그인 중...</p>
      </div>
    );
  }

  return null;
}
