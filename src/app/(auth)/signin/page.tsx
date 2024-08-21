"use client";

import authAPI from "@/apis/authAPI";
import { Button } from "@/components/Button";
import Input from "@/components/Input/Input";
import Popup, { closePopup, openPopup } from "@/components/Popup";
import baseSchema from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type LoginFormData = z.infer<typeof baseSchema>;
const loginSchema = baseSchema.pick({ email: true, password: true });

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "all",
  });
  const router = useRouter();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const expiredRefreshToken = searchParams.get("expiredRefreshToken");

    if (expiredRefreshToken === "true") {
      openPopup("signin");
    }
  }, []);

  const onSubmit = async (data: LoginFormData) => {
    try {
      await authAPI.login(data);
      router.push("/");
    } catch (error) {
      let err = String(error);
      if (err === "비밀번호가 일치하지 않습니다.") {
        openPopup("password");
      } else {
        openPopup("unknownUser");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-2 flex w-full flex-col gap-[28px]">
      <Input
        register={register("email")}
        type="email"
        name="email"
        label="이메일"
        placeholder="이메일을 입력해주세요"
        error={errors.email}
        touched={touchedFields.email}
      />
      <Input
        register={register("password")}
        type="password"
        name="password"
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요"
        error={errors.password}
        touched={touchedFields.password}
      />
      <Button size="wide" disabled={!isValid}>
        로그인하기
      </Button>
      <div className="-mt-1 text-center">
        회원이 아니신가요?{" "}
        <Link href="/signup">
          <span className="text-blue-500 underline">회원가입</span>
        </Link>
      </div>
      <Popup
        id="password"
        text="비밀번호가 틀렸습니다."
        leftButton="확인"
        onChangeLeftButton={() => closePopup("password")}
      />
      <Popup
        id="signin"
        text="로그인이 만료되었습니다. 다시 로그인 해주세요."
        leftButton="확인"
        onChangeLeftButton={() => closePopup("signin")}
      />
      <Popup
        id="unknownUser"
        text="유저정보가 존재하지 않습니다.회원가입 페이지로 이동할까요?"
        leftButton="아니요"
        onChangeLeftButton={() => closePopup("unknownUser")}
        rightButton="네"
        onChangeRightButton={() => router.push("/signup")}
      />
    </form>
  );
}

export default SignIn;
