"use client";

import authAPI from "@/apis/authAPI";
import { Button } from "@/components/Button";
import Input from "@/components/Input/Input";
import Popup, { openPopup } from "@/components/Popup";
import baseSchema from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
  const [passwordWrong, setPasswordWrong] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    try {
      await authAPI.login(data);
      router.push("/");
    } catch (error) {
      let err = String(error);
      if (err === "비밀번호가 일치하지 않습니다.") {
        setPasswordWrong(true);
        openPopup();
      } else {
        setPasswordWrong(false);
        openPopup();
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-12">
      <Image src="/images/logo_big.png" width={340} height={192} alt="메인로고" />
      <form onSubmit={handleSubmit(onSubmit)} className="mt-2 flex w-[640px] flex-col gap-[28px]">
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
      </form>

      <div className="flex items-center gap-[37.5px] text-center text-gray-500">
        <hr className="w-[180px] border-gray-300" />
        <span className="w-[205px] text-xl">SNS 계정으로 로그인하기</span>
        <hr className="w-[180px] border-gray-300" />
      </div>

      <div className="flex justify-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300">
          <Image src="/icons/icon-google.svg" width={27} height={27} alt="Google 로그인" />
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300">
          <Image src="/icons/icon-kakao.svg" width={27} height={27} alt="카카오톡 로그인" />
        </div>
      </div>
      {passwordWrong ? (
        <Popup text="비밀번호가 틀렸습니다." onCloseButton="확인" />
      ) : (
        <Popup
          text="유저정보가 존재하지 않습니다.회원가입 페이지로 이동할까요?"
          onCloseButton="아니요"
          onChangeButton="네"
        />
      )}
    </div>
  );
}

export default SignIn;
