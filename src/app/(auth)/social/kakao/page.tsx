"use client";

import OauthAPI from "@/apis/OauthAPI";
import userAPI from "@/apis/usersAPI";
import kakaoSocialStatusStore from "@/store/kakaoSocialStatusStore";
import socialLoginStore from "@/store/socialLoginStore";
import axios from "axios";
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
    return { nickname: data.properties.nickname, profileImage: data.properties.profile_image };
  }, []);

  // Kakao Image를 formData로 변경
  const updateUserProfile = async (profileImage: string | null) => {
    const response = await fetch(profileImage, {
      mode: "cors", // CORS 모드 명시적 설정
      credentials: "same-origin", // 같은 출처의 쿠키만 전송
    });

    const blob = await response.blob();

    const formData = new FormData();
    formData.append("image", blob, "profile.jpg");

    const { profileImageUrl } = await userAPI.postUsersImage(formData);
    return profileImageUrl;
  };

  useEffect(() => {
    const handleKakaoRedirect = async () => {
      // kakao 인가 code 추출
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");
      if (!alreadyGetUserData) {
        const accessToken = await getKakaoToken(code);
        const { nickname, profileImage } = await getKakaoUserData(accessToken);
        const profileImageUrl = profileImage;
        updateKakaoProfile(nickname, profileImageUrl);
        await getUserData();
        await router.push(
          `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_RESTAPI_KEY}&redirect_uri=${domain}&scope=profile_nickname,profile_image`,
        );
      } else {
        const nicknames = socialLoginStore.getState().nickname;
        const profileImage = socialLoginStore.getState().profileImageUrl;
        if (code && !alreadyExistKakaoUser) {
          const data = {
            nickname: nicknames,
            token: code,
            redirectUri: domain || "",
          };
          try {
            const response = await OauthAPI.postSignup("kakao", data);
            if (response) {
              const profileImageUrl = await updateUserProfile(profileImage);
              const patchImg = await userAPI.patchUsers({
                profileImageUrl,
              });
              if (patchImg) {
                setIsLoading(false);
                router.push("/");
              }
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
            redirectUri: domain || "",
          };
          const response = await OauthAPI.postSignin("kakao", data);
          if (response) {
            const profileImageUrl = await updateUserProfile(profileImage);
            const patchImg = await userAPI.patchUsers({
              nickname: nicknames,
              profileImageUrl,
            });
            if (patchImg) {
              setIsLoading(false);
              socialLoginSuccess();
              router.push("/");
            }
          }
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
